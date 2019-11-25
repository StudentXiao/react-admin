import React,{Suspense} from 'react';
import {authRoutes, noAuthRoutes} from './config/routers';
import BasicLayout from './components/basic-layout';
import history from './utils/history';
import {Spin} from "antd";
import './index.less';
import {Route, Switch} from 'react-router-dom';
import {Router} from 'react-router';

function App() {
  return (
    <Suspense fallback={<Spin size="large" className="lazy-loading" />}>
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
    </Suspense>

  );
}

export default App;
