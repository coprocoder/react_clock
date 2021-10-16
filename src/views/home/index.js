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
    this.state = {
      clockModeList: []
    };
    this.selectZones = timezones.map((item, index) => {
      return { value: index, label: item.name, timezone: item.timezone }
    })
    this.handleChangeZone = this.handleChangeZone.bind(this);
  }

  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate()
    })
  }

  handleChangeZone = (selectedIndex, selectedZone) => {
    if(this.props.clockModeList[selectedIndex] != selectedZone.value)
      this.props.changeZone({ index: selectedIndex, zone: selectedZone.value })
  }

  getClockList = () => (
    this.props.clockModeList.map((item, index) => {
      let curZone = this.selectZones[this.props.clockModeList[index]]
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