import React from 'react';
import { useHistory } from 'react-router'
import { connect } from 'react-redux';
import { openModal, deleteMove } from '../../actions';

const MoveAdminOptions = ({moveName, moveKey, guildId, deleteMove, openModal}) => {

  const history = useHistory();

  const cancelModal = {
    header: `Delete ${moveName}`,
    content: `Do you actually want to delete ${moveName}? It'll be gone... forever....`,
    submitAction: () => deleteMove(moveKey, guildId)
  }

  const onDelete = event => {
    event.preventDefault();
    openModal(cancelModal);
  }

  const onEdit = event => {
    event.preventDefault();
    history.push(`/moves/edit/${moveKey}/guild/${guildId}`);
  }

  const onShow = event => {
    event.preventDefault();
    history.push(`/moves/show/${moveKey}/guild/${guildId}`);
  }
  

    return (
      <div>
        <a className="admin-option" onClick={onShow}><i className="eye icon"></i></a>
        <a className="admin-option" onClick={onEdit}><i className="edit outline icon"></i></a>
        <a className="admin-option" onClick={onDelete} ><i className="trash icon"></i></a>
      </div>
    );
};

export default connect(null, { openModal, deleteMove })(MoveAdminOptions);
