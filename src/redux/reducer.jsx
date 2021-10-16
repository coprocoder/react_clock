var Map = require("immutable").Map;

const initialState = {
  clockCount: 2,
  clockModeList: [0, 0]
}

var reducer = function (state = initialState, action) {
  switch (action.type) {
    case "ADD_CLOCK":
      return { ...state, clockModeList: action.payload };
    // case "LOGIN_USER":
    //     return {...state, currentUser: action.payload};
    // case "SIGNUP_USER":
    //     return {...state, currentUser: action.payload};
    // case 'LOGOUT_USER':
    //     return {...state, currentUser: {} };
    default:
      return state;
  }
}
module.exports = reducer;