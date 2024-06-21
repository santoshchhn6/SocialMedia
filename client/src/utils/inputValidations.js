export const name_validation = {
  name: "name",
  type: "text",
  placeholder: "Name",
  validation: {
    required: "Enter your name",
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};

export const email_validation = {
  name: "email",
  type: "email",
  placeholder: "Email",
  validation: {
    required: "Please enter email address",
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Invalid email address",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};

export const username_validation = {
  name: "username",
  type: "text",
  placeholder: "Username",
  validation: {
    required: "Please enter username",
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};

export const password_validation = {
  id: "password",
  name: "password",
  type: "password",
  placeholder: "Password",
  validation: {
    required: "Please enter password",
    minLength: {
      value: 8,
      message: "minimum 8 characters",
    },
  },
};

