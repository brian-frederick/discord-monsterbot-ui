import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router'
import { connect } from 'react-redux';
import Loading from '../../common/Loading';
import UserGate from '../../common/UserGate';
import Dropdown from '../../common/Dropdown';
import FormErrorMessage from '../../common/FormErrorMessage';
import { fetchMove, createMove } from '../../../actions';
import { compoundKey } from '../../../utils/moves';
import { parseGuildName, userGuildOptions } from '../../../utils/guilds';

const RawMoveCopy = ({moveKey, guildId, move, moves, user, createMove, fetchMove}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(undefined);
  const [destinationGuild, setDestinationGuild] = useState(undefined);

  const history = useHistory();
  
  const DUP_MSG = useMemo(() => `A move with the key: ${moveKey} already exists in the server you selected.`);
  const fetchMoveCallback = useCallback(guildId => fetchMove(moveKey, guildId), [moveKey]);
  const availableGuilds = [...userGuildOptions(user.guilds.filter(g => g.id !== guildId))];

  const moveAlreadyExists = useCallback(destinationId => {
    const dupMove = moves[compoundKey({guildId: destinationId, key: moveKey })];
    return !!dupMove;
  });

  const onSubmit = async event => {
    event.preventDefault();
    
    if (!destinationGuild) {
      setErrorMsg('You must select a server for the copy.');
      return;
    }

    const destinationGuildName = parseGuildName(user.guilds, destinationGuild);

    const copiedMove = { ...move, guildId: destinationGuild, guildName: destinationGuildName};
    delete copiedMove.userDiscriminator;
    delete copiedMove.userId;
    delete copiedMove.userName;

    setLoading(true);

    await createMove(copiedMove, false);
    
    history.push('/moves/list');
  };

  const onSelectChange = (name, option) => {
    setDestinationGuild(option);
  };

  useEffect(() => {
    if (!move) {
      fetchMoveCallback(guildId);
    }
  }, [move, guildId, fetchMoveCallback]);

  useEffect(() => {
    if (destinationGuild && moveAlreadyExists(destinationGuild)) {
      setErrorMsg(DUP_MSG);
    } else if (destinationGuild) {
      fetchMoveCallback(destinationGuild);
      setErrorMsg(undefined);
    } 

    // check for potential dupes of copy once we try to fetch it
  }, [moves, DUP_MSG, destinationGuild, fetchMoveCallback, moveAlreadyExists]);

  if (loading || !move) {
    return <Loading />;
  }
  
  return (
    <div>
      <h3 className="ui header center aligned">
      <div id="move-show-options" className="right">
        <button
          className="admin-option"
          data-tooltip="back"
          data-position="bottom center"
          data-inverted  
        >
          <i onClick={history.goBack} className="arrow left icon"></i>
        </button>
      </div>
        Copy {move.name} ({move.key}) to another server
      </h3>
      <form className={`ui form ${errorMsg ? 'error' : ''}`} onSubmit={onSubmit}>
        <Dropdown
          name="guildId"
          label="Server"
          options={availableGuilds}
          selected={destinationGuild}
          onSelectedChange={onSelectChange}
        />
        <FormErrorMessage message={errorMsg} />
        <div className="field">
            <button 
              className={`ui primary button submit right floated ${errorMsg ? 'disabled' : ''}`}
              type="submit" 
            >
              Submit
            </button>
        </div>
      </form>
    </div>
  );
  
};

const mapStateToProps = (state, ownProps) => {
  return {
    move: state.moves[compoundKey({guildId: ownProps.guildId, key: ownProps.moveKey })],
    moves: state.moves
  }
};

const ConnectedMoveCopy = connect(mapStateToProps, { fetchMove, createMove })(RawMoveCopy);

const UserGatedMoveCopy = props => {
  return (
    <UserGate >
      <ConnectedMoveCopy
        guildId={props.match.params.guildId}
        moveKey={props.match.params.key}
      />
    </UserGate>
  );
};


export default UserGatedMoveCopy;
