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

    if (moves[formVals.key]) {
      errors.hasErrors = true;
      errors.key = 'This key is already being used by another move.'
    }
  }

  return errors;
};

export const parseMove =(formVals) => {
  
  const move = {
    key: formVals.key,
    type: formVals.type,
    name: formVals.name,
    playbook: formVals.playbook,
    description: formVals.description
  }

  if (formVals.type !== 'simple') {
    move.modifiers = formVals.modifiers;
  }

  if (formVals.type === 'roll') {
    move.missOutcome = formVals.missOutcome;
    move.fairOutcome = formVals.fairOutcome;
    move.successOutcome = formVals.successOutcome;
    move.advancedOutcome = formVals.advancedOutcome;
  }

  if (formVals.type === 'modification') {
    move.moveToModify = formVals.moveToModify;
  }

  return move;
};
