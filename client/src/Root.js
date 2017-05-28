import React, { Component } from 'react'
import Header from './components/Header'
import Board from './layouts/Board'
import ChooseBoard from './layouts/ChooseBoard'
import { connect } from 'react-redux'
import { USER_ACTION_CREATORS } from './state/reducers/user_reducer'
import { getBoardInfo } from './DataService'
import './index.scss'

class Root extends Component {

  state = {
    board: ''
  }

  componentDidMount() {
    getBoardInfo(this.props.boardName)
    .then(board => { 
      return this.setState({ board }) 
    })
  }

  render() {
    if (!this.state.board) {
      return null
    }
    return(
      <div>
        <Header boardName={this.state.board.boardName}/>
        <Board board={this.state.board}/>
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
)(Root)