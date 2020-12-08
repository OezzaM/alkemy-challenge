import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Operaciones from './components/operaciones/Operaciones'

import OperacionState from './context/operaciones/operacionState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada';

// Revisar si tenemos un token
const token = localStorage.getItem('token');

if(token){
  tokenAuth(token);
}

function App() {
  return (
    <OperacionState>
      <AuthState>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <RutaPrivada exact path="/operaciones" component={Operaciones} />
        </Switch>
      </Router>
      </AuthState>
    </OperacionState>
  );
}

export default App;
