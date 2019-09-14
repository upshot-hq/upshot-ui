/* eslint max-len: 0 */
export const appName = 'upshot';
export const jwtKey = 'jwtToken';
export const hashTagPrefix = '#';
export const handlePrefix = '@';
export const saltRounds = 10;
export const defaultImageSizeLimit = 2000000;
export const profileDescriptionMaxLength = 140;
export const defaultDebounceTime = 500;
export const defaultFetchLimit = 10;
export const defaultOffset = 0;
export const reactionKeys = {
  like: {
    valueKey: 'user_likes',
    countKey: 'total_likes',
  },
  dislike: {
    valueKey: 'user_dislikes',
    countKey: 'total_dislikes',
  },
};
