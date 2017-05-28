import React, { Component } from 'react'
import { connect } from 'react-redux'
import { USER_ACTION_CREATORS } from 'state/reducers/user_reducer'
import firebase from 'firebase'

class TopRated extends Component {

  render() {
    return (
      <div>
        <h1>TopRated</h1>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return state.user
}

const mapDispatchToProps = USER_ACTION_CREATORS

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopRated)