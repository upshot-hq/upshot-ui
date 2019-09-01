import * as types from '../constants/actionTypes';

export const fetchAllCompetitions = () => ({
  type: types.FETCH_ALL_COMPETIONS,
});

export const fetchAllCompetitionsSuccess = ({ message, competitions }) => ({
  type: types.FETCH_ALL_COMPETIONS_SUCCESS,
  response: { message, competitions },
});

export const fetchAllCompetitionsFailure = (error) => ({
  type: types.FETCH_ALL_COMPETIONS_FAILURE,
  error,
});
