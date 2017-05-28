import React, { Component } from 'react'
import { connect } from 'react-redux'
import { USER_ACTION_CREATORS } from '../state/reducers/user_reducer'
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import { checkIfUserExists } from '../DataService'
import { Redirect } from 'react-router-dom'

class Signup extends Component {

  state = {
    redirectToBoard: false,
    redirectToOnboarding: false,
    boardName: null
  }

  componentDidMount() {
    const uiConfig = {
      callbacks: {
        signInSuccess: (currentUser, credential, redirectUrl) => {
          checkIfUserExists(currentUser, this.redirectToBoard)
          return false;
        }
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      // TODO: Terms of service url.
      tosUrl: '<your-tos-url>'
    };

    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);

   }

   redirectToBoard = (boardName) => {
     if (boardName) {
       this.setState({ redirectToBoard: true, boardName: boardName })
     } else {
       this.setState({ redirectToOnboarding: true })
     }
   }
  
  render() {
    if (this.state.redirectToBoard) {
      const { from } = this.props.location.state || { from: { pathname: `/` } }
      return (
        <Redirect to={from}/>
      )
    } else if (this.state.redirectToOnboarding) {
      const { from } = this.props.location.state || { from: { pathname: `/choose-board/` } }
      return (
        <Redirect to={from}/>
      )
    }

    return(
      <div>
        <div id="firebaseui-auth-container"></div>
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
)(Signup)