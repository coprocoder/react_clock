
const addClock = (newClock) => {
  return dispatch => {
    // let newClock = {}
    dispatch(addClockAction(newClock))
  }
}

const changeZone = (newZone) => {
  console.log('changeZone', newZone)
  return dispatch => {
    dispatch(changeZoneAction(newZone))
  }
}

const addClockAction = newClock => ({
  type: 'ADD_CLOCK',
  payload: newClock
})

const changeZoneAction = newZone => ({
  type: 'CHANGE_ZONE',
  payload: newZone
})


module.exports = { changeZone, addClock };