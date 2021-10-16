
const addClock = () => {
  return dispatch => {
    // let newClock = {}
    dispatch(addClockAction())
  }
}

const changeZone = (newZone) => {
  console.log('changeZone', newZone)
  return dispatch => {
    dispatch(changeZoneAction(newZone))
  }
}

const addClockAction = _ => ({
  type: 'ADD_CLOCK'
})

const changeZoneAction = newZone => ({
  type: 'CHANGE_ZONE',
  payload: newZone
})


module.exports = { changeZone, addClock };