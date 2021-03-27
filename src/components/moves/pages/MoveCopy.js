import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../common/Loading';
import UserGate from '../../common/UserGate';
import Dropdown from '../../common/Dropdown';
import FormErrorMessage from '../../common/FormErrorMessage';
import { fetchMove, createMove } from '../../../actions';
import { compoundKey } from '../../../utils/moves';
import { parseGuildName, userGuildOptions } from '../../../utils/guilds';

const MoveCopy = ({moveKey, guildId, user}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(undefined);
  const [destinationGuild, setDestinationGuild] = useState(undefined);
  
  const move = useSelector(state => state.moves[compoundKey({guildId: guildId, key: moveKey })]);
  const moves = useSelector(state => state.moves);
  const DUP_MSG = useMemo(() => `A move with the key: ${moveKey} already exists in the server you selected.`, [moveKey]);
  
  const availableGuilds = [...userGuildOptions(user.guilds.filter(g => g.id !== guildId))];

  const history = useHistory();
  const dispatch = useDispatch();

  const moveAlreadyExists = useCallback(destinationId => {
    const dupMove = moves[compoundKey({guildId: destinationId, key: moveKey })];
    return !!dupMove;
  }, [moveKey, moves]);

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

    await dispatch(createMove(copiedMove, false));
    
    history.push(`/moves/show/${moveKey}/guild/${destinationGuild}`);
  };

  const onSelectChange = (name, option) => {
    setDestinationGuild(option);
  };

  useEffect(() => {
    if (!move) {
      dispatch(fetchMove(moveKey, guildId));
    }
  }, [move, moveKey, guildId, dispatch]);

  useEffect(() => {
    if (destinationGuild && moveAlreadyExists(destinationGuild)) {
      setErrorMsg(DUP_MSG);
    } else if (destinationGuild) {
      dispatch(fetchMove(moveKey, destinationGuild));
      setErrorMsg(undefined);
    } 

  }, [moves, moveKey, DUP_MSG, destinationGuild, moveAlreadyExists, dispatch]);

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

const UserGatedMoveCopy = props => {
  return (
    <UserGate >
      <MoveCopy
        guildId={props.match.params.guildId}
        moveKey={props.match.params.key}
      />
    </UserGate>
  );
};


export default UserGatedMoveCopy;
