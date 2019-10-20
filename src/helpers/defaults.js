/* eslint max-len: 0 */
export const appName = 'upshot';
export const jwtKey = 'jwtToken';
export const hashTagPrefix = '#';
export const handlePrefix = '@';
export const saltRounds = 10;
export const defaultImageSizeLimit = 5000000;
export const profileDescriptionMaxLength = 140;
export const defaultDebounceTime = 500;
export const defaultFetchLimit = 10;
export const defaultOffset = 0;
export const maxBestCaptionLength = 98;
export const increment = 'increment';
export const decrement = 'decrement';
export const rearrangedString = 'rearranged';
export const newNotificationEvent = 'new_notification';
export const unread = 'unread';
export const read = 'read';
export const failedToFetch = 'failed to fetch';
export const tabUrlQueryKey = 'tab';
export const reactionKeys = {
  like: {
    valueKey: 'user_likes',
    countKey: 'total_likes',
  },
  dislike: {
    valueKey: 'user_dislikes',
    countKey: 'total_dislikes',
  },
  pin: {
    valueKey: 'user_pins',
  },
  bookmark: {
    valueKey: 'user_bookmarks',
  },
};
export const eventKeys = {
  startAt: 'start_at',
};
export const eventPostKeys = {
  caption: 'caption',
};
export const reactions = {
  like: 'like',
  dislike: 'dislike',
  pin: 'pin',
  bookmark: 'bookmark',
};
export const resources = {
  event: 'event',
  post: 'eventPost',
};
export const searchScopes = {
  all: 'all',
  events: 'events',
  posts: 'posts',
};
export const enterKeyCode = 13;
export const countSuffixes = {
  thousand: {
    suffix: 'k',
    trigger: 10000,
    divider: 1000,
  },
  million: {
    suffix: 'm',
    trigger: 1000000,
    divider: 1000000,
  },
  billion: {
    suffix: 'b',
    trigger: 1000000000,
    divider: 1000000000,
  },
};
export const booleanStrings = {
  true: 'true',
  false: 'false',
};

export const dbResourceToPageMapping = {
  events: '/events',
};

export const notificationClassToTabMapping = {
  winners: 'winners',
};
