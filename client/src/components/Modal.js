import React, { Component, PropTypes } from 'react';
import ReactModal from "react-modal"
import { connect } from 'react-redux'
import { MODAL_ACTION_CREATORS } from '../state/reducers/modal_reducer'

const modalStyles = {
  overlay : {
    backgroundColor: 'rgba(26,26,26,0.9)',
    zIndex: 3,
    position: 'fixed',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
  },
  content : {
    position: 'absolute',
    border: 'none',
    boxShadow: '0px 5px 13.5px 1.5px rgba(57, 57, 57, 0.15)',
    background: '#fff',
    borderRadius: '1px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '60%',
    height: '80%',
    padding: '0px',
    transform: 'translate(-50%, -50%)',
    overflow: 'auto'
  }
};

const modalButtonStyles = {
  position: 'absolute',
  right: '10px',
  top: '10px'
}

class Modal extends Component {

  handleCloseModal = () => {
    this.props.closeModal()
  }

  render() {

    if(!this.props.view) {
      return null
    }
    
    return (
      <div>
        <ReactModal
          isOpen={this.props.displayModal}
          style={modalStyles}
          contentLabel="Modal"
        >
          <button style={ modalButtonStyles } onClick={ this.handleCloseModal }>X</button>
          { React.createElement(this.props.view) }
        </ReactModal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.modal
}

const mapDispatchToProps = MODAL_ACTION_CREATORS

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)