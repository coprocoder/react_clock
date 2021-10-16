const initialState = {
  clockCount: 2,
  clockModeList: [0, 0]
}

var reducer = function (state = initialState, action) {
  switch (action.type) {
    case "ADD_CLOCK":
      return { ...state, clockModeList: action.payload };
    case "CHANGE_ZONE":
      let newZoneList = state.clockModeList
      newZoneList[action.payload.index] = action.payload.zone
      console.log('CHANGE_ZONE',  state, newZoneList)
      return { ...state, clockModeList: newZoneList };
    default:
      return state;
  }
}
module.exports = reducer;