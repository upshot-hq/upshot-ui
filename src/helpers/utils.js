import jwtDecode from 'jwt-decode';
import bcrypt from 'bcryptjs';
import { createBrowserHistory } from 'history';

import {
  jwtKey, hashTagPrefix, handlePrefix, saltRounds, reactionKeys,
  increment, decrement, reactions,
} from './defaults';
import lang from './en.default';

const { allTab, eventsTab, postsTab } = lang.explorePage.tabs;

export const isExpired = (expiredTimeInSec) => {
  const now = new Date();
  const nowInSec = Math.floor(now.getTime() * 0.001); // Convert date to sec
  return nowInSec > expiredTimeInSec;
};

export const getUserDetails = (tokn) => {
  const token = tokn || localStorage.getItem(jwtKey);
  const userData = token ? jwtDecode(token) : null;
  const isAuthenticated = !!(userData && !isExpired(userData.exp));

  if (tokn && isAuthenticated) {
    localStorage.setItem(jwtKey, tokn);
  }

  const data = {
    isAuthenticated,
    userData,
  };

  return data;
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
  const formData = new FormData(); // eslint-disable-line
  Object.keys(data).forEach((key) => formData.append(key, data[key]));

  return formData;
};

export const filterExploredContent = (content, filter = allTab) => {
  // filter out events
  if (filter.toLowerCase() === eventsTab.toLowerCase()) {
    return content.filter((resource) => ('start_at' in resource));
  }

  // filter out posts
  if (filter.toLowerCase() === postsTab.toLowerCase()) {
    return content.filter((resource) => ('caption' in resource));
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
 * @param {string} reaction (like/dislike)
 * @param {object} post
 * @param {bool} reactionType
 * @returns {object}
 */
export const handlePostReaction = (reaction, post, reactionType) => {
  let newPost = { ...post };
  const { valueKey: key, countKey } = reactionKeys[reaction];
  newPost = updatePostValue(newPost, key, reactionType);

  if (reactionType) {
    newPost = updatePostCount(newPost, increment, countKey, 1);
  } else {
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
 * @param {string} reaction (like/dislike)
 * @param {array} posts
 * @param {integer} postToReactId
 * @param {bool} reactionType
 * @returns {array}
 */
export const handlePostReactionInPosts = (reaction, posts, postToReactId, reactionType) => {
  const newPostList = [...posts];
  for (let i = 0; i < newPostList.length; i += 1) {
    let post = newPostList[i];
    if (post.id === postToReactId) {
      post = handlePostReaction(reaction, post, reactionType);
      newPostList[i] = post;
      break;
    }
  }

  return newPostList;
};

/**
 * determines which search result should be returned
 * @param {array} firstResult
 * @param {array} secondResult
 * @param {boolean} returnSecondResult - if it should return the firstResult or secondResult
 * @returns {array} currentResult or newResult
 */
export const fillSearchResults = (firstResult, secondResult, returnSecondResult) => {
  if (returnSecondResult) return secondResult;
  return firstResult;
};
