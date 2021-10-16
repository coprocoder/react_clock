import React, { Component } from 'react';
import { connect } from 'react-redux';


// Мои модули
import { addClock, changeZone } from '../../redux/actions';
import CustomClock from '../../components/Widgets/Clock';

import timezones from '../../timezones.json'

// Стили
import "./home.scss"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.selectZones = timezones.map((item, index) => {
      return { value: index, label: item.name }
    })
  }

  componentDidMount() {
    console.log('Home props', this.props)
  }

  handleChangeZone = (selectedIndex, selectedZone) => {
    console.log('handleChangeZone', selectedIndex, selectedZone)
    this.props.changeZone({ index: selectedIndex, zone: selectedZone.value })
  }

  render() {
    console.log({ timezones })
    return (
      <div className="clock-view">
        {this.props.clockModeList.map((item, index) => (
          <CustomClock
            index={index}
            curZone={timezones[item]}
            selectZones={this.selectZones}
            handleChangeZone={this.handleChangeZone}
          />
        ))}
      </div>
    )
  }
}

// export default Home;

const mapStateToProps = state => ({
  clockCount: state.clockCount,
  clockModeList: state.clockModeList
})

const mapDispatchToProps = dispatch => ({
  addClock: () => dispatch(addClock()),
  changeZone: (index, value) => dispatch(changeZone(index, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);