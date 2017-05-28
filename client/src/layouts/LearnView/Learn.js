import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MODAL_ACTION_CREATORS } from 'state/reducers/modal_reducer'
import { USER_ACTION_CREATORS } from 'state/reducers/user_reducer'
import firebase from 'firebase'
import AddContent from './AddContent'
import Modal from 'components/Modal'
import Pagination from 'components/Pagination'
import TopRated from './TopRated'
import Articles from './Articles'
import client from 'fetch_helper'
import { getUserBoard } from 'DataService'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import PaginationTwo from 'components/PaginationTwo'

const tabs = {
  recentArticles: 'Recent Articles',
  medicalArticles: 'Medical Articles',
  topRated: 'Top Rated',
  videos: 'Popular Videos'
}

class LearnView extends Component {

  state = {
    learnDBContent: null,
    view: tabs.recentArticles,
    mostPopular: '',
    medicalArticles: ''
  }

  componentDidMount() {
    var learnRef = firebase.database().ref(`${this.props.boardName}/learn`);
    learnRef.on('value', (snapshot) => {
      const mostPopular = _.orderBy(snapshot.val().article, 'starCount', 'desc')
      this.setState({ learnDBContent: snapshot.val(), mostPopular })
    });

    client.get(`/latest-news/${this.props.boardName}`)
    .then(data => {
      this.setState({ medicalArticles: data })
    })
  }

  handleAddContent = () => {
    this.props.setModalView(AddContent)
  }

  handleViewChange = e => {
    this.setState({ view: e.target.value })
  }

  render() {

    if (!this.state.learnDBContent) {
      return null
    }

    let view
    switch(this.state.view) {
      case tabs.recentArticles: {
        view = <PaginationTwo allPosts={this.state.learnDBContent.article}><Articles /></PaginationTwo>
        break;
      }
      case tabs.medicalArticles: {
        view = <PaginationTwo allPosts={this.state.medicalArticles}><Articles /></PaginationTwo>
        break;
      }
      case tabs.topRated:
        view = <Articles allPosts={this.state.mostPopular} />
        break;
      default: null
    }
 
    return (
      <div className="learn-container">
        <div className="learn-nav">
          { _.map(tabs, (tab, key) => {
            return <button key={key} onClick={this.handleViewChange} value={tab}>{tab}</button>
          }) }
        </div>
        <button className="add-content" onClick={this.handleAddContent}>Add Content</button>
        <div className="main-container learn-main-view">
          { view }
        </div>
        <div className="learn-sidebar">
          <h1>Podcasts</h1>
          <h1>Books</h1>
        </div>
        <Modal />
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    ...state.modal,
    ...state.user
  }
}

const mapDispatchToProps = {
  ...MODAL_ACTION_CREATORS,
  ...USER_ACTION_CREATORS
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearnView)