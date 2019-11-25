import {GET_CATEGROIES_SUCCESS} from '../action-types/category';
import {reqGetCategories} from '../../api/index';


// 同步
const getCategories = (categories) =>{
  return {
    type: GET_CATEGROIES_SUCCESS,
    data: categories
  }
};

// 异步
export const getCategoriesAsync = () =>{
  return (dispatch) => {
    return reqGetCategories()
      .then((response) =>{
        dispatch(getCategories(response))
      })
  }
};