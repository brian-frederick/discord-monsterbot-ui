import React from 'react';
import { useHistory } from 'react-router'
import { connect } from 'react-redux';
import { openModal, deleteMove, editMoveUser } from '../../actions';

const MoveAdminOptions = ({moveName, moveKey, guildId, editMoveUser, deleteMove, openModal}) => {

  const history = useHistory();

  const deleteModalContent = {
    header: `Delete ${moveName}.`,
    content: `Do you actually want to delete ${moveName}? It'll be gone... forever....`,
    submitAction: () => deleteMove(moveKey, guildId),
    destination: 'moves/list',
  }

  const onDelete = event => {
    event.preventDefault();
    openModal(deleteModalContent);
  };

  const onEdit = event => {
    event.preventDefault();
    history.push(`/moves/edit/${moveKey}/guild/${guildId}`);
  }

  const onEditGuild = event => {
    event.preventDefault();
    history.push(`/moves/edit-guild/${moveKey}/guild/${guildId}`);
  }

  const adminOptions = [
    {iconName:'edit outline', data:'edit', click: onEdit },
    {iconName:'users', data:'change guild', click: onEditGuild },
    {iconName:'trash', data:'delete', click: onDelete },
  ];

  const mapAdminOptions = () => {
    return adminOptions.map(option => {
      return (
        <button
          key={option.data}
          className="admin-option"
          data-tooltip={option.data}
          data-position="bottom center"
          data-inverted
          onClick={option.click}
        >
          <i className={`${option.iconName} icon`}></i>
        </button>
      )
    });
  }
  return (
    <div>
      {mapAdminOptions()}
    </div>
  );
};

export default connect(null, { openModal, deleteMove, editMoveUser })(MoveAdminOptions);
