import React, { Component } from 'react'
import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, IndexRoute, Redirect } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import configureStore from './state/configureStore'
import Root from './Root'
import SignUp from './components/SignUp'
import ChooseBoard from './layouts/ChooseBoard'
import LearnView from './layouts/LearnView/Learn'
import Board from './layouts/Board'
import firebase from 'firebase'
import { authenticateUser} from './utils'
import { firebaseConfig } from './config'

export const store = configureStore()
const history = createBrowserHistory()

firebase.initializeApp(firebaseConfig)

if (process.env.NODE_ENV === 'production') {

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Route render={props => (
            authenticateUser.isAuthenticated ? (
              React.createElement(Root, props)
            ) : (
              <Redirect to={{
                pathname: '/signup',
                state: { from: props.location }
              }} />
            )
          )} />
          <Route path='/signup' component={SignUp}/>
          <Route path="/board/:boardName" component={Board}/>
          <Route path="/learn" component={LearnView}/>
          <Route path="/choose-board" component={ChooseBoard} />
        </div>
      </Router>
    </Provider>
    , document.getElementById('root')
  );

} 
else {

  const render = () => {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <Router history={ history }>
            <div>
              <Route exact path={'/'} render={props => (
                authenticateUser.isAuthenticated ? (
                  React.createElement(Root, props)
                ) : (
                  <Redirect to={{
                    pathname: '/signup',
                    state: { from: props.location }
                  }} />
                )
              )} />
              <Route path='/signup' component={SignUp}/>
              <Route path="/board/:boardName" component={Board}/>
              <Route path="/learn" component={LearnView}/>
              <Route path="/choose-board" component={ChooseBoard} />
            </div>
          </Router>
        </Provider>
      </AppContainer>
      , document.getElementById('root')
    );
  }

  if (module.hot) {
    module.hot.accept('./Root.js', () => {
      ReactDOM.render(
        <AppContainer>
          <Provider store={store}>
            <Router history={ history }>
              <div>
                <Route exact path={'/'} render={props => (
                  authenticateUser.isAuthenticated ? (
                    React.createElement(Root, props)
                  ) : (
                    <Redirect to={{
                      pathname: '/signup',
                      state: { from: props.location }
                    }} />
                  )
                )} />
                <Route path='/signup' component={SignUp}/>
                <Route path="/board/:boardName" component={Board}/>
                <Route path="/learn" component={LearnView}/>
                <Route path="/choose-board" component={ChooseBoard} />
              </div>
            </Router>
          </Provider>
        </AppContainer>
        , document.getElementById('root')
      );
    });
  }

  window.addEventListener('load', () => {
    authenticateUser.authenticate(render)
  })

}

