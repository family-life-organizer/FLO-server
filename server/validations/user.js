import Validator from "validator";
import isEmpty from "./isEmpty";

const validateSignupInput = input => {
  const errors = {};
  const data = input;

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name field is required";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lasName = "Last Name is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!errors.email) {
    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!errors.password) {
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password must be at least 6 characters";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateLoginInput = input => {
  const errors = {};
  const data = input;
  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username) && Validator.isEmpty(data.email)) {
    errors.email = "Username or Email field is required";
  }

  if (!Validator.isEmpty(data.email)) {
    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateAddUserInput = input => {
  const errors = {};
  const data = input;
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = {
  validateSignupInput,
  validateLoginInput,
  validateAddUserInput
};
