export const findInputError = (errors, name) =>
  Object.keys(errors)
    .filter((key) => key.includes(name))
    .reduce((cur, key) => Object.assign(cur, { error: errors[key] }), {});
