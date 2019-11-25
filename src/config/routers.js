import Home from '../components/home/index';
import Login from '../containers/login/login';
import Category from '../containers/category/category';
import NotMatch from '../components/not-match/index';


/*需要进行权限验证*/
const authRoutes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/category',
    component: Category,
    exact: true
  },
  {
    component: NotMatch     // 404 在最后
  }
];

/*不需要进行权限验证*/
const noAuthRoutes = [
  {
    path: '/login',
    component: Login,
    exact: true
  },
];
export {
  authRoutes,
  noAuthRoutes
}