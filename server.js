const express = require("express");
require('dotenv').config('./env');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const subscriptionHandler = require('./src/subscriptionHandler');

const socketio = require('socket.io')({
  path: '/socket'
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


const port = process.env.PORT || 5000;
const host = process.env.HOSTNAME || "0.0.0.0";
const server = app.listen(port, host, () => {
  console.log(`Node.js API server is listening on http://${host}:${port}`);
});
const io = socketio.listen(server);

// database connection 
const dburl = process.env.NODE_ENV==='development' ? process.env.DB_URL_DEV : process.env.DB_URL_PROD;
 mongoose.connect(dburl, {
		useNewUrlParser: true,
	}).then(()=>{
    console.log(`MongoDB connected....`);
  }).catch(err=>{
   console.log(err);
  });

// cross origin resource sharing , prevents from calling API from unknown client
app.use(
    cors({
      origin: (origin, cb)=>{
        const whitelist = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : [];
        cb(null, whitelist.includes(origin));
      }
    })
  );




const { addUser, removeUser, getUser, getUsersInRoom } = require('./src/users');

io.on('connect', (socket) => {
  console.log("user connected")
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if(error) return callback(error);
    socket.join(user.room);
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
   user && io.to(user.room).emit('message', { user: user.name, text: message });
    callback();
  });

  socket.on('sendTyping', (data)=>{
    const user = getUser(socket.id);
    if(data.typing==true && user){
       io.to(user.room).emit('display', data)
    }
    
  })

  socket.on('disconnect', () => {
    console.log("user dis")
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});


//serve static asset 

// app.use(router);



const userRouter = require('./src/router');
app.use('/api/v1/users', userRouter);
app.post("/subscription", subscriptionHandler.handlePushNotificationSubscription);
app.post("/subscriptionpost", subscriptionHandler.sendPushNotification);

if(process.env.NODE_ENV==="production"){

  app.use(express.static('client/build'));
  app.get('*',(req, res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}



