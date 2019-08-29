import * as types from '../constants/actionTypes';

export const getCompetitions = () => ({
  type: types.GET_COMPETITIONS,
});

export const getCompetitionsSuccess = (competitionsData) => ({
  type: types.GET_COMPETITIONS_SUCCESS,
  competitionsData,
});

export const getCompetitionsFailure = (error) => ({
  type: types.GET_COMPETITIONS_FAILURE,
  error,
});
