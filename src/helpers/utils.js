import jwtDecode from 'jwt-decode';
import bcrypt from 'bcryptjs';
import SimpleCrypto from 'simple-crypto-js';
import { createBrowserHistory } from 'history';

import {
  jwtKey, hashTagPrefix, handlePrefix,
  saltRounds, reactionKeys, countSuffixes,
  increment, decrement, reactions, unread, read,
  eventKeys, eventPostKeys,
} from './defaults';
import lang from './en.default';

const { allTab, eventsTab, postsTab } = lang.explorePage.tabs;

/**
 * Encrypts or decrypts plain texts and cipher texts respectively
 */
export const simpleCrypto = new SimpleCrypto(process.env.REACT_APP_AUTH_SECRET);

export const isExpired = (expiredTimeInSec) => {
  const now = new Date();
  const nowInSec = Math.floor(now.getTime() * 0.001); // Convert date to sec
  return nowInSec > expiredTimeInSec;
};

export const getUserDetails = (tokn) => {
  try {
    const token = tokn || localStorage.getItem(jwtKey);
    const decryptedToken = token ? simpleCrypto.decrypt(token) : null;
    const userData = decryptedToken ? jwtDecode(decryptedToken) : null;
    const isAuthenticated = !!(userData && !isExpired(userData.exp));

    if (tokn && isAuthenticated) {
      localStorage.setItem(jwtKey, tokn);
    }

    if (!isAuthenticated) {
      localStorage.removeItem(jwtKey);
    }

    const data = {
      isAuthenticated,
      userData,
    };

    return data;
  } catch (error) {
    localStorage.removeItem(jwtKey);
    return {
      isAuthenticated: false,
      userData: null,
    };
  }
};

export const apiErrorHandler = (error) => {
  let errorMessage;
  let validationErrors;
  // if server gets an error response, handle it
  if (error.response) {
    /**
     * using a switch statement instead of if/else because there is
     * a chance that we have to handle other error codes when we make
     * requests like GET to the server
     */
    switch (error.response.status) {
    case 500:
      errorMessage = lang.serverErrorMessage;
      break;
    case 422:
      validationErrors = error.response.data.errors
        .map((err) => err.msg || err.message)
        .join(', ');
      errorMessage = `${validationErrors}`;
      break;
    case 400:
      errorMessage = error.response.data.message || error.response.statusText;
      break;
    default:
      errorMessage = error.response.data.error || error.response.data.message;
    }
  } else {
    //  if server is down, client won't get a response
    errorMessage = lang.networkErrorMessage;
  }
  return errorMessage;
};

export const history = createBrowserHistory();

export const addStylesToHashTags = (text) => {
  const textArray = text.split(' ');

  const updatedText = textArray.map((word) => {
    if (word.startsWith(hashTagPrefix) || word.startsWith(handlePrefix)) {
      const newWord = `<span class="hashtag">${word}</span>`;
      return newWord;
    }

    return word;
  });

  return updatedText.join(' ');
};

export const hashData = async (data) => {
  const hashedData = await bcrypt.hash(data, saltRounds);
  return hashedData;
};

export const createFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));

  return formData;
};

/**
 * checks if resource is an event
 * @param {object} resource
 * @returns boolean
 */
export const isResourceEvent = (resource) => {
  try {
    return (eventKeys.startAt in resource);
  } catch (error) {
    return false;
  }
};

/**
 * checks if resource is an event's post
 * @param {object} resource
 * @returns boolean
 */
export const isResourceEventPost = (resource) => {
  try {
    return (eventPostKeys.eventId in resource);
  } catch (error) {
    return false;
  }
};

export const filterExploredContent = (content, filter = allTab) => {
  // filter out events
  if (filter.toLowerCase() === eventsTab.toLowerCase()) {
    return content.filter((resource) => isResourceEvent(resource));
  }

  // filter out posts
  if (filter.toLowerCase() === postsTab.toLowerCase()) {
    return content.filter((resource) => isResourceEventPost(resource));
  }

  return content;
};

/**
 * Method to update the total count of a post
 * @param {object} post
 * @param {string} updateType (increment/decrement)
 * @param {string} key
 * @param {integer} value
 * @returns {object}
 */
export const updatePostCount = (post, updateType, key, value) => {
  const newPost = { ...post };
  let total = 0;
  const count = Number.parseInt(newPost[key], 10);
  if (Number.isNaN(count)) {
    return newPost;
  }
  if (updateType === increment) {
    total = count + value;
  } else {
    total = count - value;
  }
  if (total < 0) {
    total = 0;
  }
  newPost[key] = `${total}`;
  return newPost;
};

/**
 * method to update a specific value of a post using the key
 * @param {object} post
 * @param {string} key
 * @param {any} value
 * @returns {object}
 */
export const updatePostValue = (post, key, value) => {
  const newPost = { ...post };
  newPost[key] = value;

  return newPost;
};

/**
 * method to handle reaction on a post
 * @param {string} reaction (like/dislike/bookmark)
 * @param {object} post
 * @param {bool} reactionType
 * @returns {object}
 */
export const handlePostReaction = (reaction, post, reactionType) => {
  let newPost = { ...post };
  const { valueKey: key, countKey } = reactionKeys[reaction];
  newPost = updatePostValue(newPost, key, reactionType);

  if (reactionType && [reactions.like, reactions.dislike].includes(reaction)) {
    newPost = updatePostCount(newPost, increment, countKey, 1);
  } else if (!reactionType && [reactions.like, reactions.dislike].includes(reaction)) {
    newPost = updatePostCount(newPost, decrement, countKey, 1);
  }

  if (reactionType && reaction === reactions.like && post.user_dislikes) {
    // remove user dislike status if user likes the post
    newPost = updatePostValue(newPost, reactionKeys.dislike.valueKey, !reactionType);
    newPost = updatePostCount(newPost, decrement, reactionKeys.dislike.countKey, 1);
  } else if (reactionType && reaction === reactions.dislike && post.user_likes) {
    // remove user like status if user dislikes the post
    newPost = updatePostValue(newPost, reactionKeys.like.valueKey, !reactionType);
    newPost = updatePostCount(newPost, decrement, reactionKeys.like.countKey, 1);
  }

  return newPost;
};

/**
 * method to handle reacting (like/dislike) on a specific post in an array of posts
 * @param {string} reaction (like/dislike/bookmark)
 * @param {array} resources
 * @param {integer} postToReactId
 * @param {bool} reactionType
 * @returns {array}
 */
export const handlePostReactionInPosts = (reaction, resources, postToReactId, reactionType) => {
  const newResources = [...resources];
  for (let i = 0; i < newResources.length; i += 1) {
    let resource = newResources[i];
    const isPost = isResourceEventPost(resource);
    if (isPost && resource.id === postToReactId) {
      resource = handlePostReaction(reaction, resource, reactionType);
      newResources[i] = resource;
      break;
    }
  }

  return newResources;
};

/**
 * method to handle reaction on an event
 * @param {string} reaction (pin)
 * @param {object} event
 * @param {bool} reactionType
 * @returns {object}
 */
export const handleEventReaction = (reaction, event, reactionType) => {
  const newEvent = { ...event };
  if (reaction === reactions.pin) {
    newEvent[reactionKeys.pin.valueKey] = reactionType;
  }

  if (reactionType) {
    newEvent.total_pins += 1;
  } else {
    newEvent.total_pins -= 1;
  }

  return newEvent;
};

/**
 * method to handle reaction on a specific event in an array of events
 * @param {string} reaction (pin)
 * @param {array} resources
 * @param {integer} eventToReactId
 * @param {bool} reactionType
 * @returns {object}
 */
export const handlesEventReactionInEvents = (
  reaction, resources, eventToReactId, reactionType,
) => {
  const newResources = [...resources];
  for (let i = 0; i < newResources.length; i += 1) {
    let resource = newResources[i];
    const isEvent = isResourceEvent(resource);
    if (isEvent && resource.id === eventToReactId) {
      resource = handleEventReaction(reaction, resource, reactionType);
      newResources[i] = resource;
      break;
    }
  }

  return newResources;
};

/**
 * determines which result should be returned
 * @param {array} firstResult
 * @param {array} secondResult
 * @param {boolean} returnSecondResult - if it should return the firstResult or secondResult
 * @returns {array} selected result
 */
export const determineResult = (firstResult, secondResult, returnSecondResult) => {
  if (returnSecondResult) return secondResult;
  return firstResult;
};

/**
 * modifies count by appending appropriate countSuffixes to it
 * @param {integer} count - count to modify
 * @returns {string} modified count
 */
export const modifyCounts = (count) => {
  let num = Number.parseInt(count, 10);
  const { thousand, million, billion } = countSuffixes;

  // check for higher countSuffixes first
  if (num && num >= billion.trigger) {
    num /= billion.divider;
    if (!Number.isInteger(num)) num = num.toFixed(1);
    num = `${num}${billion.suffix}`;
  } else if (num && num >= million.trigger) {
    num /= million.divider;
    if (!Number.isInteger(num)) num = num.toFixed(1);
    num = `${num}${million.suffix}`;
  } else if (num && num >= thousand.trigger) {
    num /= thousand.divider;
    if (!Number.isInteger(num)) num = num.toFixed(1);
    num = `${num}${thousand.suffix}`;
  }

  return num;
};

export const handleRemoveUserEvent = (state, action) => {
  const { userId, eventId } = action;
  const { pagination, stats } = state;
  const events = state.events.filter(
    (event) => (event.id !== eventId || (event.id === eventId && event.user_id === userId)),
  );

  if (events.length < state.events.length) {
    pagination.totalCount -= 1;
    stats.totalUserEvents -= 1;
  }

  return { events, pagination, stats };
};

export const handleRemoveUserBookmark = (state, action) => {
  const { postId } = action;
  const { bookmarks: stateBookmarks, bookmarksPagination } = state;
  const bookmarks = stateBookmarks
    .filter((bookmark) => (bookmark.id !== postId));

  if (bookmarks.length < stateBookmarks.length) {
    bookmarksPagination.totalCount -= 1;
  }

  return { bookmarks, bookmarksPagination };
};

/**
 * method to beautify a position e.g: converts 1 to 1st or 23 to 23rd
 * @param {string} position
 * @return {string} beautifiedPosition
 */
export const beautifyPosition = (position) => {
  const positionString = `${position}`;
  switch (positionString.charAt(positionString.length - 1)) {
  case '1':
    return `${positionString}st`;
  case '2':
    return `${positionString}nd`;
  case '3':
    return `${positionString}rd`;
  default:
    return `${positionString}th`;
  }
};

export const handleNotificationsUpdate = (state, action) => {
  let { unreadNotificationsCount, notifications } = state;
  const { notificationData: newNotification } = action;

  if (newNotification.status && typeof newNotification.status === 'string'
      && newNotification.status.toLowerCase() === unread.toLowerCase()) {
    unreadNotificationsCount += 1;
    notifications = [newNotification, ...notifications];
  }

  return { unreadNotificationsCount, notifications };
};

/**
 * method to retrieve query value from url query parameters using a key
 * @param {string} queryKey
 * @param {string} queryString
 * @returns {string} queryValue
 */
export const getUrlQueryValue = (queryKey, queryString) => {
  const regex = new RegExp(`${queryKey}=([^&]*)`);
  const queryValue = regex.exec(queryString) === null
    ? '' : regex.exec(queryString)[0].split('=')[1];
  return queryValue;
};

export const handleNotificationStatusUpdate = (state, action) => {
  // eslint-disable-next-line
  let { notifications, unreadNotificationsCount } = state;
  const { notificationData: { notification: updatedNotification } } = action;

  for (let i = 0; i < notifications.length; i += 1) {
    if (notifications[i].id === updatedNotification.id) {
      notifications[i] = updatedNotification;

      if (unreadNotificationsCount > 0 && updatedNotification.status === read) {
        unreadNotificationsCount -= 1;
      }
      break;
    }
  }

  return { unreadNotificationsCount, notifications };
};

/**
 * this update events in content
 * @param {array} content
 * @param {object} updatedEvent
 * @returns {array} updated content
 */
export const handleEventsUpdateInContent = (content, updatedEvent) => {
  const newContent = [...content];
  for (let i = 0; i < newContent.length; i += 1) {
    const resource = newContent[i];
    const isEvent = isResourceEvent(resource);

    if (isEvent && resource.id === updatedEvent.id) {
      newContent[i] = { ...resource, ...updatedEvent };
      break;
    }
  }

  return newContent;
};
