import * as types from "../constants/ActionTypes";

var initialState = {
  by: "",
  value: 1 // 1 tăng    -1 giảm
};

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SORT:
      console.log(action.sort);
      return {
        by: action.sort.by,
        value: parseInt(action.sort.value)
      };
    default:
      return state;
  }
};

export default myReducer;
