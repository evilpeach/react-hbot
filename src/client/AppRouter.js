import React from 'react';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';

import App from './App';
import InformationForm from './components/InformationForm';

const AppRouter = () => (
  <Router history={browserHistory}>
    <div>
      <Switch>
        <Route path="/" component={InformationForm} exact={true}/>  
      </Switch>
    </div>
  </Router>
)

export default AppRouter;