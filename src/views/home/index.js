import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';


// Мои модули
import { addClock, changeZone } from '../../redux/actions';
import CustomClock from '../../components/Widgets/Clock';
import store from '../../redux/store'

import timezones from '../../timezones.json'

// Стили
import "./home.scss"

// class Home extends PureComponent {
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.selectZones = timezones.map((item, index) => {
      return { value: index, label: item.name, timezone: item.timezone }
    })
    this.reduxStore = store.getState()
    this.handleChangeZone = this.handleChangeZone.bind(this);

  }

  componentDidMount() {
    console.log('Home props', this.props)
    store.subscribe(() => {
      this.reduxState = store.getState()
      console.info('reduxState', this.reduxState)
      // if(this.props.clockModeList == this.reduxState.clockModeList)
      //   console.info('reduxState same', this.props, this.reduxState)

      this.forceUpdate()
    })
  }

  shouldComponentUpdate(nextProps){
    console.log('shouldComponentUpdate', this.props, nextProps)
  }

  handleChangeZone = (selectedIndex, selectedZone) => {
    // console.log('handleChangeZone', selectedIndex, selectedZone)
    this.props.changeZone({ index: selectedIndex, zone: selectedZone.value })
  }

  getClockList = () => (
    this.props.clockModeList.map((item, index) => {
      // console.log('clockModeList item', item)
      // console.log('clockModeList timezones[item]', timezones[item])

      let curZone = this.selectZones[this.props.clockModeList[index]]
      console.log('ttt', curZone)
      return <CustomClock
        key={index}
        index={index}
        curZone={curZone}
        selectZones={this.selectZones}
        handleChangeZone={this.handleChangeZone}
      />
    })
  )

  render() {
    // console.log('render timezones', timezones)
    console.log('render props', this.props)
    return (
      <div>
        <div className="clock-view">
          {this.getClockList()}
        </div>
        <div className="clock-addBtn" onClick={() => this.props.addClock()}><button>Добавить</button></div>
      </div>
    )
  }
}

// function Home(props) {
//   const selectZones = timezones.map((item, index) => {
//     return { value: index, label: item.name }
//   })

//   const { clockModeList, clockCount } = props;

//   function handleChangeZone(selectedIndex, selectedZone) {
//     // console.log('handleChangeZone', selectedIndex, selectedZone)
//     props.changeZone({ index: selectedIndex, zone: selectedZone.value })
//   }

//   return (
//     <div className="clock-view">
//       {clockModeList.map((item, index) => (
//         <CustomClock
//           key={index}
//           index={index}
//           curZone={timezones[item]}
//           selectZones={selectZones}
//           handleChangeZone={handleChangeZone}
//         />
//       ))}
//     </div>
//   )
// }

// export default Home;

const mapStateToProps = state => ({
  clockModeList: state.clockModeList
})

const mapDispatchToProps = dispatch => ({
  addClock: () => dispatch(addClock()),
  changeZone: (index, value) => dispatch(changeZone(index, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);