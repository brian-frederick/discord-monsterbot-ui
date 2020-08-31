export const validate = (formVals, createMode) => {
  let errors = {};

  if (!formVals.name || formVals.name.length < 1) {
    errors.hasErrors = true;
    errors.name = 'Name is a required field.';
  }

  if (!formVals.description || formVals.description.length < 1) {
    errors.hasErrors = true;
    errors.description = "Description is a required field.";
  }

  if (!formVals.key || formVals.description.length < 1) {
    errors.hasErrors = true;
    errors.key = 'A key is required to create a move.';
  } 

  return errors;
}