import { compoundKey } from '../utils/moves';

export const validateMove = (formVals, createMode, moves) => {
  let errors = {};

  if (!formVals.name || formVals.name.length < 1) {
    errors.hasErrors = true;
    errors.name = 'Name is a required field.';
  }

  if (!formVals.description || formVals.description.length < 1) {
    errors.hasErrors = true;
    errors.description = "Description is a required field.";
  }
  
  // we only need to validate the key if we're creating a move
  if (createMode) {
    if (formVals.key.length > 5 || formVals.key.length < 2) {
      errors.hasErrors = true;
      errors.key = 'A key must have between 2 and 5 letters.'
    }

    if (/[^a-zA-Z]/.test(formVals.key)) {
      errors.hasErrors = true;
      errors.key = 'A key must contain only letters.'
    }

    if (moveAlreadyExists(formVals, moves)) {
      errors.hasErrors = true;
      errors.key = 'This key is already being used by another move.'
    }
  }

  return errors;
};

export const moveAlreadyExists = (formVals, moves) => {
  if (moves[compoundKey(formVals)]) {
    return true;
  } else {
    return false;
  }
};

export const formToMove = (formVals, guilds) => {

  const move = {
    key: formVals.key,
    type: formVals.type,
    name: formVals.name,
    playbook: formVals.playbook,
    description: formVals.description,
    guildId: formVals.guildId,
  }

  if (formVals.type !== 'simple') {
    move.modifiers = formVals.modifiers;
  }

  if (formVals.type === 'roll') {
    move.outcome = {
      fail: {
        title: "On a fail...",
        description: formVals.fail
      },
      success: {
        title: "On a 7+...",
        description: formVals.success
      },
      high: {
        title: "On a 10+...",
        description: formVals.high
      },
      advanced: {
        title: 'On a 12+...',
        description: formVals.advanced
      }
    };
  }

  if (formVals.type === 'modification') {
    move.moveToModify = formVals.moveToModify;
  }

  const selectedGuild = guilds.find(g => g.id === move.guildId);
  move.guildName = selectedGuild ? selectedGuild.name : 'Public';

  return move;
};

export const moveToForm = (move) => {
  const formVals = {
    key: move.key,
    type: move.type,
    name: move.name,
    playbook: move.playbook,
    description: move.description,
    guildId: move.guildId ? move.guildId : '1',
  };

  formVals.modifiers = move.modifiers ? move.modifiers : [];

  formVals.fail = move.type === 'roll' ? move.outcome.fail.description : '';
  formVals.success = move.type === 'roll' ? move.outcome.success.description : '';
  formVals.high = move.type === 'roll' ? move.outcome.high.description : '';
  formVals.advanced = move.type === 'roll' ? move.outcome.advanced.description : '';

  formVals.moveToModify = move.moveToModify ? move.moveToModify : 'ksa';

  return formVals;
}
