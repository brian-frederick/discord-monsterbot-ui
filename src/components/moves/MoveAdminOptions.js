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

  const onChangeGuild = event => {
    event.preventDefault();
    history.push(`/moves/changeGuild/${moveKey}/guild/${guildId}`);
  }

  const adminOptions = [
    {iconName:'edit outline', data:'edit', click: onEdit },
    {iconName:'users', data:'change server', click: onChangeGuild },
    {iconName:'trash', data:'delete', click: onDelete },
    {iconName: 'user circle outline', data:'change creator', click: onDelete}
  ]

  const mapAdminOptions = () => {
    return adminOptions.map(option => {
      return (
        <button
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

export default connect(null, { openModal, deleteMove })(MoveAdminOptions);
