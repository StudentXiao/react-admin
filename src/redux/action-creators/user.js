
import {reqLogin} from "../../api";
import {GET_USER_SUCCESS} from '../action-types/user';
import {REMOVE_USER_SUCCESS} from '../action-types/user';

// 同步
const getUserSuccess = (user) =>{
  return {
    type: GET_USER_SUCCESS,
    data: user
  }
};

export const removeUserSuccess = () =>{
  return {
    type: REMOVE_USER_SUCCESS
  }
};

// 异步
export const getUserAsync = (username, password) =>{
  return (dispatch) =>{
    // 进行异步操作
    return reqLogin(username,password)
      .then((response) =>{
        // 创建 action
        const action = getUserSuccess(response);
        dispatch(action);
        return response;
      })
  }
};