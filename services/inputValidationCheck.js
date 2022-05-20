const { WRONG_EMAIL_FORM, HAVE_SYMBOL_CHARACTER, HAVE_SPACE, PASSWORD_CONFIRM_FAIL } = require("../constants/errorMessage");
const isEmailValidate = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
const hasSymbolCharacter = /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g;
const hasSpace = /[\s]/g;

exports.inputValidationCheck = (inputData) => {
  const { username, email, password, password2 } = inputData;
  const result = {};

  if (!isEmailValidate.test(email)) {
    result.status = 'invalid';
    result.message = WRONG_EMAIL_FORM;

    return result;
  }

  if (hasSymbolCharacter.test(username)) {
    result.status = 'invalid';
    result.message = HAVE_SYMBOL_CHARACTER;

    return result;
  }

  if (hasSpace.test(username)) {
    result.status = 'invalid';
    result.message = HAVE_SPACE;

    return result;
  }

  if (password !== password2) {
    result.status = 'invalid';
    result.message = PASSWORD_CONFIRM_FAIL;

    return result;
  }

  result.status = 'success';

  return result;
}
