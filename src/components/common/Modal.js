import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeModal } from '../../actions';
import Loading from '../common/Loading';

class Modal extends React.Component {
  state = {
    loading:false
  };

  onClickSubmit = async () => {
    this.setState({ loading: true });
    await this.props.modal.submitAction();
    this.setState({ loading: false });
    if (this.props.modal.destination) {
      this.props.history.push(this.props.modal.destination);
    }
    this.props.closeModal();
  }
  
  render() {
    if (!this.props.modal.isActive) {
      return null;
    } else if (this.state.loading) {
      return <Loading />;
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