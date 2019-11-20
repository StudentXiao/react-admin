## react-admin 后台管理系统


## redux开发流程
  1. 先定义action-creators
   - 定义同步/异步
    - 如果要发送请求，就定义异步
    - 如果不需要发送请求，就定义同步
  
 2. 定义action-types
 
 3. 定义reducer
 4.通过 connect()  高阶组件 给 UI 传递 redux 数据
 5.组件再使用传递过来的数据
  