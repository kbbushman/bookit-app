export function passwordsMatch(field, getValues) {
  return function (confirmPassword) {
    const password = getValues()[field];

    return password === confirmPassword;
  };
}
