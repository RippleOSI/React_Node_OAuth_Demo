import { getUserProfile } from './token-store';

const isAuthorised = (authorisation) => {
  console.log(authorisation);
  if (!authorisation) return true;

  const userProfile = getUserProfile();
  console.log(userProfile);
  return authorisation.isAuthorised(userProfile);
}

export default {
  isAuthorised
}