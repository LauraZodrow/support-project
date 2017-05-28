import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MODAL_ACTION_CREATORS } from 'state/reducers/modal_reducer'
import { USER_ACTION_CREATORS } from 'state/reducers/user_reducer'
import { addLearnContent } from 'DataService'

class AddContent extends Component {

  state = {
    contentOptions: [
      'book',
      'article',
      'podcast',
      'videos'
    ],
    title: '',
    description: '',
    link: '',
    contentType: ''
  }

  handleSubmit = e => {
    e.preventDefault()
    addLearnContent(this.props.boardName, this.state.contentType, this.state.title, this.state.description, this.state.link)
  }

  handleSelect = (e) => {
    this.setState({contentType: e.target.value})
  }

  render() {
    return (
      <div>
        <p>Add Image</p>
        <form>
          <label>Content Type</label>
          <select onChange={this.handleSelect} name="contentType">
            { this.state.contentOptions.map((type, key) => {
              return <option key={key} value={type}>{type}</option>
            })}
          </select>
          <div>
            <label>Title</label>
            <input 
              type="text" 
              name="title" 
              onChange={ (e) => {this.setState({title: e.target.value})} }
            />
          </div>
          <div>
            <label>Link for more info</label>
            <input 
              type="text" 
              name="link" 
              onChange={ (e) => {this.setState({link: e.target.value})} }
            />
          </div>
          <div>
            <label>Short Description</label>
            <textarea 
              type="text" 
              name="description" 
              onChange={ (e) => {this.setState({description: e.target.value})} }
            />
          </div>
          <button onClick={this.handleSubmit} type="submit">Submit</button>
        </form>
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
)(AddContent)