import React from 'react';
import { connect } from 'react-redux';
import { openModal, deleteMove } from '../../actions';

class MoveAdminOptions extends React.Component {

  cancelModal = {
    header: `Delete ${this.props.moveName}`,
    content: `Do you actually want to delete ${this.props.moveName}? It'll be gone... forever....`,
    submitAction: () => this.props.deleteMove(this.props.moveKey)
  }

  onClick = event => {
    event.preventDefault();
    this.props.openModal(this.cancelModal);
  }

  deleteMove = () => {
    this.props.deleteMove(this.props.moveKey);
  }
  
  render () {
    return (
      <div>
        <a className="admin-option" href={'/moves/show/' + this.props.moveKey}><i className="eye icon"></i></a>
        <a className="admin-option" href={'/moves/edit/' + this.props.moveKey}><i className="edit outline icon"></i></a>
        <a className="admin-option" onClick={this.onClick} ><i className="trash icon"></i></a>
      </div>
    );
  }
};

export default connect(null, { openModal, deleteMove })(MoveAdminOptions);
