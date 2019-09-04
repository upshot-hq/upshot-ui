import * as types from '../constants/actionTypes';

export const fetchAllCompetitions = () => ({
  type: types.FETCH_ALL_COMPETITIONS,
});

export const fetchAllCompetitionsSuccess = ({ message, competitions }) => ({
  type: types.FETCH_ALL_COMPETITIONS_SUCCESS,
  response: { message, competitions },
});

export const fetchAllCompetitionsFailure = (error) => ({
  type: types.FETCH_ALL_COMPETITIONS_FAILURE,
  error,
});
