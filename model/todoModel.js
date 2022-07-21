const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    id:{
        type: String,
		required: [true, 'Please add the Name'],
    },
	title: {
		type: String,
		required: [true, 'Please add the Name'],
	},
	completed: {
		type: Boolean,
		default: false,
	},
	
	synced: {
		type: Boolean,
		default: true,
	},
	level: {
		type: String,
		required: [true, 'Please add a level'],
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'user',
		required: true,
	},
});



todoSchema.pre('save', async function (next) {
	this.synced = true;
    next();
});

module.exports = mongoose.model('todo', todoSchema);
