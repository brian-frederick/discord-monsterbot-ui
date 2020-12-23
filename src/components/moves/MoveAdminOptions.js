import React from 'react';
import { useHistory } from 'react-router'
import { connect } from 'react-redux';
import { openModal, deleteMove, editMoveUser } from '../../actions';
import { checkForEmailConsent } from '../../utils/discordLogin';


const MoveAdminOptions = ({moveName, moveKey, guildId, editMoveUser, deleteMove, openModal}) => {

  const history = useHistory();

  const deleteModalContent = {
    header: `Delete ${moveName}.`,
    content: `Do you actually want to delete ${moveName}? It'll be gone... forever....`,
    submitAction: () => deleteMove(moveKey, guildId)
  }

  const changeOwnerModalContent = {
    header: `Make yourself the owner of ${moveName}?`,
    content: `Did you create this move? Make yourself the owner. This is a temporary option to help us figure out who created which move. Going forward, only owners will be able to edit or delete their moves.`,
    submitAction: () => editMoveUser(moveKey, guildId, checkForEmailConsent()),
  };

  const onDelete = event => {
    event.preventDefault();
    openModal(deleteModalContent);
  };

  const onChangeOwner = event => {
    event.preventDefault();
    openModal(changeOwnerModalContent);
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
    {iconName: 'user circle outline', data:'change owner', click: onChangeOwner}
  ]

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
