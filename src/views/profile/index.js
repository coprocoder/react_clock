import React, { Component } from 'react';
import {connect} from 'react-redux';
import jwt from 'jwt-decode'

// FontAwesome
import { FontAwesomeIcon }      from '@fortawesome/react-fontawesome'
import { faHome, faSignOutAlt, faUser, faBookMedical, faClipboard, faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons'

// Мои модули
import {getProfileFetch, logoutUser} from '../../redux/actions';
import LogIn           from '../auth/login'

// Общие виджеты
import Transpose         from '../../components/Widgets/Transpose'
import ImgUploader from './ImgUploader';
import DocUploader from './DocUploader';

// Юзерские виджеты
import WidgetList from '../../components/Widgets/Profile/Diary/WidgetList';
import SchedulerView from '../../components/Widgets/Profile/Scheduler';
import HelpMap from '../../components/Widgets/Profile/HelpMap';

// Service modules
import { unwrap } from '../../db/wrapper';
import localize from '../../components/DataFormat/locale';
import hidden_keys from '../../components/DataFormat/service_keys';

// Стили
import "./profile.scss"

import config from '../../config'
const server = config.server

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSingin = this.handleSingin.bind(this);
  }

  getUser(){
    let token = localStorage.getItem('token')
    let user = token ? jwt(token) : null
    this.setState({user: user})
  }

  componentDidMount = () => {
    document.title = "Личный кабинет"
    this.props.getProfileFetch()
    this.getUser()
  }

  handleSingin() {
    window.location.href = '/signup'
  }

  render() {
    // console.log(this.props.currentUser)
    return (
      !!this.state.user 
        ? <div className="profile">
            <ProfileHeader 
              username={unwrap(this.state.user.username)}
              logoutUser={this.props.logoutUser}
            />
            <ProfileContent 
              user={this.state.user}
            />
          </div>
        : <LogIn key='login'/>
    )
  }
}

class ProfileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleHome = this.handleHome.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount(){
    // console.log(this.props.username)
  }

  handleLogout(e) {
    e.preventDefault();
    // Удаление token из localStorage
    localStorage.removeItem("token")
    // удаление из Redux хранилица
    this.props.logoutUser()

    fetch(server + '/auth/logout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(response => {
      //alert('Вы вышли из аккаунта')
      window.location.href = '/'
    })
  }
  
  handleHome(){
    window.location.href = '/'
  }

  render() {
    return (
        <div className="profile-header">
          <div className="profile-header-info" title="Пользователь">
            <label>{localize("username")}: {this.props.username}</label>
          </div>
          <div className="profile-header-btnBlock">
            <label className="profile-header-btn profile-header-homeBtn" onClick={this.handleHome} title="На главную"><FontAwesomeIcon icon={faHome} /></label>
            <label className="profile-header-btn profile-header-logoutBtn" onClick={this.handleLogout} title="Выйти из системы"><FontAwesomeIcon icon={faSignOutAlt} /></label>
          </div>
        </div>
    )
  }

}

class ProfileContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      content_id: 0
    };
    this.getProfileData = this.getProfileData.bind(this);
  }

  componentDidMount() {
    console.log('Profile content props', this.props)
    this.getProfileData()
  }

  getProfileData = () => {
    let user = this.props.user
    let user_data = {}
    
    for(var key in user) {
      if(hidden_keys.indexOf(key) === -1) {
        let user_val = unwrap(user[key])
        if(typeof(user_val) != "object" && hidden_keys.indexOf(user_val) == -1) {
          user_data[key] = user_val
        }
      }
    }

    let base_content = [
      <div key="ProfileDashboard" className="profile-main-dashboard">
        <Transpose key='Transpose' title="Данные профиля" data={user_data}/>
        <ImgUploader key="ImgUploader" />
        <DocUploader key="DocUploader" />
      </div>
    ]

    this.setState({ 
      userData: user_data, 
      content: base_content 
    })
  }

  setContent = (mode) => {
    let cur_content
    switch (mode) {
      case(0):
        cur_content = [
          <div key="ProfileDashboard" className="profile-main-dashboard">
            <Transpose key='Transpose' title="Данные профиля" data={this.state.userData}/>
            <ImgUploader key="ImgUploader" />
            <DocUploader key="DocUploader" />
          </div>
        ]
        break;
      case(1):
        cur_content = [
          <div key='WdgList' className="profile-widgets-list">
            <WidgetList />
          </div>,
        ]
        break;
      case(2):
        cur_content = [
          <SchedulerView key='SchedulerView'/>
        ]
        break;
      case(3):
        cur_content = [
          <HelpMap key='HelpMap'/>
        ]
        break;
      default:
        break;
    }

    this.setState({
      content_id: mode,
      content: cur_content
    })
  }

  render() {
    return (
      <div className="profile-content">
        <ProfileNav 
          content_id={this.state.content_id}
          handleSelect={(mode) => this.setContent(mode)}
        />

        <div className="profile-content-view">
          {this.state.content}
        </div>
      </div>
    )
  }
}

class ProfileNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div className="profile-nav-view">
        <div className={this.props.content_id===0 ? "active": ""} onClick={() => this.props.handleSelect(0)}>
          <label className="nav-item-icon"><FontAwesomeIcon icon={faUser}/></label>
          <label className="nav-item-label">{ window.screen.width > 600 ? "Профиль" : ""}</label>
        </div>
        <div className={this.props.content_id===1 ? "active": ""} onClick={() => this.props.handleSelect(1)}>
          <label className="nav-item-icon"> <FontAwesomeIcon icon={faBookMedical}/></label>
          <label className="nav-item-label">{ window.screen.width > 600 ? "Дневники" : ""}</label>
        </div>
        <div className={this.props.content_id===2 ? "active": ""} onClick={() => this.props.handleSelect(2)}>
          <label className="nav-item-icon"><FontAwesomeIcon icon={faClipboard} /></label>
          <label className="nav-item-label">{ window.screen.width > 600 ? "Планировщик" : ""}</label>
        </div>
        <div className={this.props.content_id===3 ? "active": ""} onClick={() => this.props.handleSelect(3)}>
          <label className="nav-item-icon"><FontAwesomeIcon icon={faMapMarkedAlt} /></label>
          <label className="nav-item-label">{ window.screen.width > 600 ? "Карта помощи" : ""}</label>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);