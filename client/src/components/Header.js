import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MODAL_ACTION_CREATORS } from '../state/reducers/modal_reducer'
import { USER_ACTION_CREATORS } from '../state/reducers/user_reducer'
import { Link } from 'react-router-dom'

class Header extends Component {

  render() {
    return (
      <div className='header'> 
        <Link to={`/learn`}>LEARN</Link>
        <button>CHAT</button>
        <h1>{this.props.boardName}</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.modal,
    ...state.user
  }
}

const mapDispatchToProps = {
  ...MODAL_ACTION_CREATORS,
  ...USER_ACTION_CREATORS
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)