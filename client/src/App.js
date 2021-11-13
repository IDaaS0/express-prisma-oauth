import React from 'react';
import Home from './components/Home';
import { AuthProvider } from './contenxt/AuthContext';
import { BrowserRouter, Switch } from 'react-router-dom';
import SignIn from './components/SignIn';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ margin: '2em' }}>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PublicRoute path="/signin" component={SignIn} />
          </Switch>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
