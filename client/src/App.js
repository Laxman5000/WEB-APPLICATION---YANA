import React, { useEffect } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all";
import "./App.css";
import Welcome from './Welcome';
import Calculator from "./components/Calculator/Calculator";
import Join from "./components/Chat/Join";
import Chat from "./components/Chat/Chat";
import News from "./components/News/News";
import Quotes from "./components/Quotes/Quotes";
import Sidebar from "./components/macros/Sidebar-bug";
import Weather from "./components/Weather/Weather";
import "./welcome.css";
import Footer from "./components/macros/Footer";
import Install from "./components/macros/Install";
import Search from "./components/News/Search";
import Books from "./components/Books/Books";
import Currency from "./components/Currency/currency";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { clearState, getUser } from './services/AuthApi';
import { useDispatch, useSelector } from "react-redux";
import usePushNotifications from "./usePushNotifications";
import { setCordinates, setPushServerSubscriptionId } from "./services/PwaService";
import { Loading } from "./components/macros/Loading";
import { setTodos, getUserTodo } from "./services/todoApi";

function App (){
  

  const {
    userConsent,
    pushNotificationSupported,
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    loading
  } = usePushNotifications();

 
 
  const isConsentGranted = userConsent === "granted";
  const dispatch = useDispatch();
  const connectPushServer = async () => {
    await onClickSusbribeToPushNotification().then(async(userSubscription) => {
      if (userSubscription) {
      await onClickSendSubscriptionToPushServer(userSubscription).then(async(PSSID) => {
        // console.log(PSSID);
        dispatch(setPushServerSubscriptionId(PSSID)); 
      });
    }
    })
  }

  useEffect(() => {
    !isConsentGranted && onClickAskUserPermission();
    if(pushNotificationSupported && isConsentGranted){
      connectPushServer();
  }
    dispatch(getUser());
    dispatch(clearState());
    
  },[])

  useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({coords}) => {
          const cordinates = { latitude: coords.latitude, longitude: coords.longitude };
            dispatch(setCordinates(cordinates));
        });
    }

}, []);

    return (
    <div className="body">
      <Loading loading={ loading } />
      <Install />
        <Router>
            <Sidebar />
            <div className="content">
              <Route path="/" exact component={Welcome}/>
              <Route path="/news"  component={News}/>
              <Route path="/calculator"  component={Calculator}/>
              <Route path="/chat"  component={Join}/>
              <Route path="/messages" component={Chat}/>
              <Route path="/quotes"  component={Quotes}/>
              <Route path="/news_search" component={Search}/>
              <Route path="/weather" component={Weather}/>
              <Route path="/books" component={Books}/>
              <Route path="/currency" component={Currency}/>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Signup}/>
            </div>
        </Router>
        <Footer />
      </div>)
  
}

export default App;
