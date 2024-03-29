import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../common/Loading';
import UserGate from '../../common/UserGate';
import Dropdown from '../../common/Dropdown';
import ToolTip from '../../common/Tooltip';
import FormErrorMessage from '../../common/FormErrorMessage';
import { fetchMove, createMove } from '../../../actions';
import { compoundKey } from '../../../utils/moves';
import { parseGuildName, userGuildOptions } from '../../../utils/guilds';
import { validateMove } from '../../../utils/forms';

const MoveCopy = ({moveKey, guildId, user}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const defaultErrorState = { hasErrors: false, key: '', guildId: ''};
  const [errorMsg, setErrorMsg] = useState(defaultErrorState);
  const [destinationGuild, setDestinationGuild] = useState(undefined);
  const [newMoveKey, setMoveKey] = useState(moveKey)
  
  const move = useSelector(state => state.moves[compoundKey({guildId: guildId, key: moveKey })]);
  const moves = useSelector(state => state.moves);
  const availableGuilds = userGuildOptions(user.guilds);

  useEffect(() => {
    dispatch(fetchMove(moveKey, guildId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (moves[compoundKey({guildId: destinationGuild, key: newMoveKey})]) {
      setErrorMsg({hasErrors: true, key: `A move with key: ${newMoveKey} already exists for this guild.`});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moves])

  const readyToSubmit = () => {
    return !!newMoveKey && !!destinationGuild && !errorMsg.hasErrors;
  };

  const onSelectChange = (name, option) => {
    setErrorMsg(defaultErrorState);
    setDestinationGuild(option);
    // Try to get a move with the same key and guild for validation purposes
    dispatch(fetchMove(newMoveKey, option));
  };

  const onMoveKeyChange = (event) => {
    setErrorMsg(defaultErrorState);
    const newVal = event.target.value.toLowerCase();
    setMoveKey(newVal);
    dispatch(fetchMove(newVal, destinationGuild));
  };

  const onSubmit = async event => {
    event.preventDefault();
    
    if (!destinationGuild || !newMoveKey) {
      setErrorMsg('You must select a server and move key for the copy.');
      return;
    }

    const destinationGuildName = parseGuildName(user.guilds, destinationGuild);

    const copiedMove = { ...move, key: newMoveKey, guildId: destinationGuild, guildName: destinationGuildName};
    delete copiedMove.userDiscriminator;
    delete copiedMove.userId;
    delete copiedMove.userName;

    const errors = validateMove(copiedMove, true, moves);
    if (errors.hasErrors) {
      setErrorMsg(errors);
      return;
    }

    setLoading(true);

    await dispatch(createMove(copiedMove, false));
    
    history.push(`/moves/show/${newMoveKey}/guild/${destinationGuild}`);
  };

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
        Copy {move.name} ({move.key})
      </h3>
      
      <form className={`ui form ${errorMsg.hasErrors ? 'error' : ''}`} onSubmit={onSubmit}>
        <div className="field required" >
          <label>
            Command Key
            <ToolTip 
              content="A unique slash command name with only letters, dashes, or underscores under 32 characters long. Cannot be edited after move creation."
              classes="ui right"
              position="top right"
            />
          </label>
          <input 
            type="text"
            placeholder="Command Key"
            name="key"
            value={newMoveKey}
            onChange={onMoveKeyChange}
          />
          <FormErrorMessage message={errorMsg.key} />
        </div>
        <Dropdown
          name="guildId"
          label="Server"
          options={availableGuilds}
          selected={destinationGuild}
          onSelectedChange={onSelectChange}
        />
        <FormErrorMessage message={errorMsg.guildId} />
        <div className="field">
            <button 
              className={`ui primary button submit right floated ${readyToSubmit() ? '' : 'disabled'}`}
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
