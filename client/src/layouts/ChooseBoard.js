import React, { Component } from 'react'
import { connect } from 'react-redux'
import { USER_ACTION_CREATORS } from 'state/reducers/user_reducer'
import { checkUserBoard, addBoard } from 'DataService'

class ChooseBoard extends Component {

  state = {
    boardValue: ''
  }

  handleChange = e => {
    this.setState({boardValue: e.target.value})
  }

  handleSubmit = () => {
    console.log('this.state.boardValue', this.state.boardValue)
    addBoard(this.props.uid, this.state.boardValue)
  }

  render() {
    return(
      <div>
       <input onChange={this.handleChange}/>
       <button onClick={this.handleSubmit} type="submit">Submit</button>
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
)(ChooseBoard)