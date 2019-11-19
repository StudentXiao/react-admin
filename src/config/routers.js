import Home from '../components/home/index';
import Login from '../components/login/login';
import NotMatch from '../components/not-match/index';

export default [{
  path: '/',
  component: Home,
  exact: true
},
  {
    path: '/login',
    component: Login,
    exact: true
  },


  {
    component: NotMatch     // 404 在最后
  }

]