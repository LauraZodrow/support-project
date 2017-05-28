import React, { Component } from 'react'
import { connect } from 'react-redux'
import { USER_ACTION_CREATORS } from 'state/reducers/user_reducer'
import firebase from 'firebase'
import StarCount from './StarCount'
import Pagination from 'components/Pagination'

class Articles extends Component {

  render() {
    return (
      <div>
        <h1>Articles</h1>
        { _.map(this.props.allPosts, (value, key) => {
          return (
            <div key={key}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
              <a href={value.link}>Read full content</a>
              <StarCount starCount={value.starCount} contentType={'article'} contentKey={key} />
            </div>
          )
        })}
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
)(Articles)