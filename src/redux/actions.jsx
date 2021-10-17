
const addClock = () => {
  return dispatch => {
    dispatch(addClockAction())
  }
}

const changeZone = (newZone) => {
  return dispatch => {
    dispatch(changeZoneAction(newZone))
  }
}

const loadTimezones = (timezones) => {
  return dispatch => {
    dispatch(loadTimezonesAction(timezones))
  }
}


const addClockAction = _ => ({
  type: 'ADD_CLOCK'
})

const changeZoneAction = newZone => ({
  type: 'CHANGE_ZONE',
  payload: newZone
})

const loadTimezonesAction = timezones => ({
  type: 'LOAD_ZONES',
  payload: timezones
})


module.exports = { changeZone, addClock, loadTimezones };