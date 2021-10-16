const initialState = {
  clockModeList: [0, 0]
}

var reducer = function (state = initialState, action) {
  switch (action.type) {
    case "ADD_CLOCK":
      let newClockList = state.clockModeList
      newClockList.push(0)
      return { ...state, clockModeList: newClockList };
    case "CHANGE_ZONE":
      let newZoneList = state.clockModeList
      newZoneList[action.payload.index] = action.payload.zone
      return {...state, clockModeList: newZoneList};
    default:
      return state;
  }
}
module.exports = reducer;