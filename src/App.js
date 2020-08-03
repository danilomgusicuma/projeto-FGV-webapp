import React, { useEffect, useRef } from 'react';
import Normalize from 'react-normalize';
import { Switch, Route, Redirect, useHistory} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Game from './components/Game/Game';
import LoginAdmin from './components/LoginAdmin/LoginAdmin';
import NotificationAlert from 'react-notification-alert';
import SimSelect from './components/SimSelect/SimSelect';
import Decisions from './components/Reports/Decisions'

import './App.css';
import "react-notification-alert/dist/animate.css";
import './alerts.css';


import socket from './connection.js';
import PanelAdmin from './components/PanelAdmin/PanelAdmin';

function App() {

  const notificationAlert = useRef(null);
  const history = useHistory()

  useEffect(()=>{
    socket.on('feedback', feedback => {
      var options = {
        place: 'tc' ,
        message: (
          <div>
            <div className='alert-message'>
              {feedback[1]}
            </div>
          </div>
        ),
        type: feedback[0],
        icon: 'fas fa-bell',
        autoDismiss: 3,
        closeButton: false,
      }
      if(feedback[0]==="danger" && feedback[1].includes('login negado para')){
        history.push('/select');
      }
      if(feedback[0]==="danger" && feedback[1]==="voce precisa estar logado para puxar o state atual da simulação"){
        history.push('/select');
      }
      notificationAlert.current.notificationAlert(options);
    })
    socket.on('disconnect', () => {
      var options = {
        place: 'tc' ,
        message: (
          <div>
            <div className='alert-message'>
              {'Voce foi desconetado do servidor.'}
            </div>
          </div>
        ),
        type: 'danger',
        icon: 'fas fa-bell',
        autoDismiss: 3,
        closeButton: false,
      }
       history.push('/select');
      
      notificationAlert.current.notificationAlert(options);
    })
  },[history])

  return (
      <>
        <NotificationAlert ref={notificationAlert} />
        <Normalize/>
        <Switch>
            <Route exact path="/">
              <Redirect to="/select"/>
            </Route>
            <Route path="/select" component={SimSelect}/>
            <Route path="/:type/login" component={Login} />
            <Route path="/:type/register" component={Register} />
            <Route path="/:type/game" component={Game} />
            <Route path="/decisions" component={Decisions}/>
            
            <Route path="/:type/admin">
              <Route path="/admin/login">
                <LoginAdmin/>
              </Route>
              <Route path="/admin/panel">
                <PanelAdmin/>
              </Route>
            </Route>
        </Switch>
      </>
  );
}

export default App;
 