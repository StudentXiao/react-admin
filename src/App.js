import React from 'react';
import routers from './config/routers';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        {
          routers.map((route,index) =>{
            return <Route {...route} key={index} />
          })
        }
      </Switch>
    </Router>

  );
}

export default App;
