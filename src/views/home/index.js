import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { animateScroll as scroll } from "react-scroll";


import { addClock, changeZone } from '../../redux/actions';
import store from '../../redux/store'

import CustomClock from '../../components/Clock';
import ScrollToTopBtn from '../../components/Buttons/ScrollToTopBtn';

import timezones from '../../timezones.json'

import "./home.scss"

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

  handleAddClock = () => {
    this.props.clockModeList.length < 24 && this.props.addClock()
    scroll.scrollToBottom();
  }

  render() {
    console.log('render props', this.props)
    return (
      <div>
        <div className="clock-view" ref={ (clockListElement) => { this.clockListElement = clockListElement } }>
          {this.getClockList()}
        </div>
        <div className="clock-addBtn">
          <button onClick={() => this.handleAddClock()}>Добавить</button>
        </div>
        <ScrollToTopBtn/>
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