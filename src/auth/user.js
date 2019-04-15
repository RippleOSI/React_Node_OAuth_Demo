import { getUserProfile } from './token-store';

const isAuthorised = (authorisation) => {
  if (!authorisation) return true;

  const userProfile = getUserProfile();
  return authorisation.isAuthorised(userProfile);
}

export default {
  isAuthorised
}