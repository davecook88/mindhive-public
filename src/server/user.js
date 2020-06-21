export const getActiveUserEmail = () => {
  const user = Session.getActiveUser();
  const email = user.getEmail();
  return email;
}