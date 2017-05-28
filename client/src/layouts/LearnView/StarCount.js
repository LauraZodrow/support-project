import React, { Component } from 'react'
import { connect } from 'react-redux'
import { USER_ACTION_CREATORS } from 'state/reducers/user_reducer'
import firebase from 'firebase'

class StarCount extends Component {

  handleStar = () => {
    const contentRef = firebase.database().ref(`${this.props.boardName}/learn/${this.props.contentType}/${this.props.contentKey}`)
    contentRef.transaction(content => {
      return {
        ...content,
        starCount: content.starCount + 1
      }
    });

  }

  render() {
    return (
      <div>
        <button onClick={this.handleStar}>{this.props.starCount} Star</button>
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
)(StarCount)