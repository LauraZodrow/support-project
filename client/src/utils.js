import firebase from 'firebase'
import firebaseui from 'firebaseui'
import { USER_ACTION_CREATORS } from './state/reducers/user_reducer'
import { store } from './index'
import { getUserBoard } from 'DataService'

export const firebaseConfig = {
  apiKey: "AIzaSyD7njnT2gzdc9Pdh25Grv_uDmqcv9JaKc0",
  authDomain: "support-app-f3855.firebaseapp.com",
  databaseURL: "https://support-app-f3855.firebaseio.com",
  projectId: "support-app-f3855",
  storageBucket: "support-app-f3855.appspot.com",
  messagingSenderId: "197366229370"
};

export const authenticateUser = {
  isAuthenticated: false,
  authenticate(render) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getToken().then(accessToken => {
          const userInfo = {
            userLoggedIn: true,
            photoURL: user.photoURL,
            uid: user.uid,
            accessToken: accessToken,
          }
          getUserBoard(user.uid)
          .then(boardName => {
            userInfo.boardName = boardName
            store.dispatch(USER_ACTION_CREATORS.setUser(userInfo))
            this.isAuthenticated = true
            render()
          })
        });
      } else {
        this.isAuthenticated = false
        render()
      }
    }, error => {
      return console.log(`Error fetching user - ${error}`);
    });
  }
}

