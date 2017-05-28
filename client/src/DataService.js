import firebase from 'firebase'
import firebaseui from 'firebaseui'
import { firebaseConfig } from './config'

export const firebaseRefs = {
  storageRef: '',
  userRef: '',
  getStorageRef() {
    return this.storageRef = firebase.app().storage("gs://support-app-f3855.firebaseapp.com").ref()
  },
  getUserRef(uid) {
    return this.userRef = firebase.database().ref('users/' + uid)
  }
}

// export const setNewUser = (currentUser, cb) => {
//   firebase.database().ref('users/' + currentUser.uid).set({
//     email: currentUser.email,
//     uid: currentUser.uid
//   })
//   .then(res => {
//     cb()
//   }); 
// } hbh
export const addBoard = (userId, boardName) => {
  firebase.database().ref('allBoards').update({boardName})
  .catch(err => {
    console.log('err', err)
  })

  firebase.database().ref(boardName).set({
    boardName: boardName
  })
  .catch(err => {
    console.log('err', err)
  })

  firebase.database().ref('users/' + userId).update({
    board: boardName
  })
  .catch(err => {
    console.log('err', err)
  })
}

export const getBoardInfo = boardName => {
  return firebase.database().ref(boardName).once('value').then(snapshot => {
    return snapshot.val();
  });
}

export const getUserBoard = userId => {
  return firebase.database().ref(`users/${userId}`).once('value').then(snapshot => {
    const exists = snapshot.val() !== null;
    if (exists) {
      return snapshot.val().board
    } else {
      return null
    }
  })
}

export const setNewUser = (userId, email) => {
  return firebase.database().ref('users/' + userId).set({
     email: email,
     uid: userId
  })
}

export const addLearnContent = (boardName, contentType, title, description, link) => {
  const newContentKey = firebase.database().ref(`${boardName}/learn/${contentType}`).push().key;
  return firebase.database().ref(`${boardName}/learn/${contentType}/${newContentKey}`).update({
    title,
    description,
    link,
    starCount: 0
  })
}
           
export const checkIfUserExists = (user, redirectToBoard) => {
  let boardName = null
  const usersRef = firebase.database().ref(`users`);
  usersRef.child(user.uid).once('value', snapshot => {
    const exists = snapshot.val();
    if (exists) {
      boardName = snapshot.val().board
    } else {
      setNewUser(user.uid, user.email)
    }
    redirectToBoard(boardName);
  })
}

// export const addCoverPhoto = (file, uid, fileName) => {
//   firebaseRefs.getStorageRef()
//   const coverImgRef = firebaseRefs.storageRef.child(`cover-images/${uid}_${fileName}`);
//   coverImgRef.put(file[0])
//   .then(snapshot => {
//     const coverImageUrl = snapshot.a.downloadURLs[0]
//     const updateCoverImage = { cover_image: coverImageUrl }
//     firebase.database().ref('users/' + uid).update(updateCoverImage);
//   })
//   .catch(error=>{
//     console.log('error', error)
//   })
// }

// export const addPost = (title, hours, body, user) => {
//   const postData = {
//     title,
//     hours,
//     body,
//     user
//   };

//   firebase.database().ref('/posts/').push().set(postData);
// }