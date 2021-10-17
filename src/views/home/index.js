import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { animateScroll as scroll } from "react-scroll";


import { addClock, changeZone, loadTimezones } from '../../redux/actions';
import store from '../../redux/store'

import CustomClock from '../../components/Clock';
import ScrollToTopBtn from '../../components/Buttons/ScrollToTopBtn';
import Loader from '../../components/Loader';

import "./home.scss"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timezones: null
    };
    this.handleChangeZone = this.handleChangeZone.bind(this);
  }

  getTimezones = () => {
    fetch('/timezones.json', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log({response})
      let selectZonesList = response.map((item, index) => {
        return { value: index, label: item.name, timezone: item.timezone }
      })
      this.props.loadTimezones(selectZonesList)
      // setTimeout(() => this.props.loadTimezones(selectZonesList), 1000) // Для проверки анимации загрузки
    })
  }

  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate()
    })
    this.getTimezones()
  }

  handleChangeZone = (selectedIndex, selectedZone) => {
    if(this.props.clockModeList[selectedIndex] != selectedZone.value)
      this.props.changeZone({ index: selectedIndex, zone: selectedZone.value })
  }

  handleAddClock = () => {
    this.props.clockModeList.length < 24 && this.props.addClock()
    scroll.scrollToBottom();
  }

  getClockList = () => (
    this.props.clockModeList.map((item, index) => (
      <CustomClock
        key={index}
        index={index}
        curZone={this.props.timezones[this.props.clockModeList[index]]}
        selectZones={this.props.timezones}
        handleChangeZone={this.handleChangeZone}
      />
    ))
  )

  render() {
    return (
      this.props.timezones ? 
        <div>
          <div className="clock-view" ref={ (clockListElement) => { this.clockListElement = clockListElement } }>
            {this.getClockList()}
          </div>
          <div className="clock-addBtn">
            <button onClick={() => this.handleAddClock()}>Добавить</button>
          </div>
          <ScrollToTopBtn/>
        </div>
      : <Loader/>
    )
  }
}

const mapStateToProps = state => ({
  clockModeList: state.clockModeList,
  timezones: state.timezones,
})

const mapDispatchToProps = dispatch => ({
  addClock: () => dispatch(addClock()),
  changeZone: (index, value) => dispatch(changeZone(index, value)),
  loadTimezones: (timezones) => dispatch(loadTimezones(timezones))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);