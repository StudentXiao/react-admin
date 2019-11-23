import React from 'react';
import {authRoutes, noAuthRoutes} from './config/routers';
import BasicLayout from './components/basic-layout/left-nav';
import history from './utils/history';
import './index.less';
import {Route, Switch} from 'react-router-dom';
import {Router} from 'react-router';

function App() {
  return (

    <Router history={history}>
      <Switch>
        {
          noAuthRoutes.map((route,index) =>{
            return <Route {...route} key={index} />
          })
        }
        <BasicLayout>
          <Switch>
            {
              authRoutes.map((route,index) =>{
                return <Route {...route} key={index} />
              })
            }
          </Switch>
        </BasicLayout>

      </Switch>

    </Router>


  );
}

export default App;
