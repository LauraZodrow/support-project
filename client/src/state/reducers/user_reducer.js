export const SET_USER= 'user: SET USER'

export const USER_ACTION_CREATORS = {
  setUser: (user) => ({
    type: SET_USER,
    payload: { user }
  })
}

export const INITIAL_STATE = {
  userLoggedIn: false,
  photoURL: null,
  uid: null,
  accessToken: null,
  boardName: null
}

export default function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case SET_USER: {
        const { user } = action.payload 

        return {
            ...state,
            userLoggedIn: user.userLoggedIn,
            photoURL: user.photoURL,
            uid: user.uid,
            accessToken: user.accessToken,
            boardName: user.boardName
        }
      }

      default: return state

    }
}
