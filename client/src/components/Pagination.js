import React, { Component } from 'react'
import { connect } from 'react-redux'
import { USER_ACTION_CREATORS } from 'state/reducers/user_reducer'
import firebase from 'firebase'
import ReactPaginate from 'react-paginate';

class Pagination extends Component {

  state = {
    articlesPerPage: 2,
    totalPages: null
  }

  componentDidMount() {
    this.calcTotalPages(this.props.allPosts)
  }

  componentWillReceiveProps(nextProps) {
    this.calcTotalPages(nextProps.allPosts)
  }

  calcTotalPages = (allPosts) => {
    const numbOfPosts = allPosts.length || _.size(allPosts)
    const calcTotalPages = Math.ceil(numbOfPosts/this.state.articlesPerPage)
    const totalPages = Array.from(Array(calcTotalPages).keys())
    return this.setState({ totalPages })
  }

  //from to slice out of array

  render() {
    return (
      <div>
         {this.props.children}
         <div>
           {this.state.totalPages ? _.map(this.state.totalPages, (value, key) => {
            return <button key={key}>{value}</button>
           }) : null }
         </div>
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
)(Pagination)