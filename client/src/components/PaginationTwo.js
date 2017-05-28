import React, { Component } from 'react'
import { connect } from 'react-redux'
import { USER_ACTION_CREATORS } from 'state/reducers/user_reducer'
import firebase from 'firebase'
import ReactPaginate from 'react-paginate';
import client from 'fetch_helper'
import Articles from 'layouts/LearnView/Articles'

class Pagination extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      offset: 0,
      articlesPerPage: 2,
      pageCount: 0
    }
  }

  componentDidMount() {
    this.calcTotalPages(this.props.allPosts)
  }

  componentWillReceiveProps(nextProps) {
    this.calcTotalPages(nextProps.allPosts)
  }

  calcTotalPages = (allPosts) => {
    const numbOfPosts = allPosts.length || _.size(allPosts)
    const pageCount = Math.ceil(numbOfPosts/this.state.articlesPerPage)
    return this.setState({ pageCount })
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({offset: offset}, () => {
        client.get(`/latest-news/${this.props.boardName}`)
        .then(data => {
            this.setState({ medicalArticles: data })
        })
    });
  };

  render() {
    return (
       <div className="commentBox">
        <Articles allPosts={this.props.allPosts} />
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
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