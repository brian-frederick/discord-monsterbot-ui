import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeModal } from '../../actions';

class Modal extends React.Component {

  onClickSubmit =() => {
    this.props.modal.submitAction();
    this.props.history.push('/moves/list');
    this.props.closeModal();
  }
  
  render() {
    console.log(this.props);
    if (!this.props.modal.isActive) {
      return null;
    } else {
      return (
        <div id="modal-container" className="ui page modals dimmer transition visible active">
          <div className="ui small basic modal transition visible active">
      <div className="header">{this.props.modal.header}</div>
            <div className="content">
              <p>{this.props.modal.content}</p>
            </div>
            <div className="actions">
              <button onClick={this.props.closeModal} className="ui red basic inverted button">Cancel</button>
              <button onClick={this.onClickSubmit} className="ui green inverted button">Submit</button>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  };
};

const connectModal = connect(mapStateToProps, { closeModal })(Modal);

export default withRouter(connectModal);