import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MODAL_ACTION_CREATORS } from '../state/reducers/modal_reducer'
import { USER_ACTION_CREATORS } from '../state/reducers/user_reducer'
import { Link } from 'react-router-dom'

class Board extends Component {

  render() {
    return (
      <div>
        <h1>People your talking to</h1>
        <h1>Things your learning from</h1>
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
)(Board)