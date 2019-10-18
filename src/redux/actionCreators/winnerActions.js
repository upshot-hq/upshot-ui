import * as types from '../constants/actionTypes';

export const generateWinners = (eventId) => ({
  type: types.GENERATE_WINNERS,
  eventId,
});

export const generateWinnersSuccess = (winnersData) => ({
  type: types.GENERATE_WINNERS_SUCCESS,
  winnersData,
});

export const generateWinnersFailure = (error) => ({
  type: types.GENERATE_WINNERS_FAILURE,
  error,
});

export const getWinners = (eventId) => ({
  type: types.GET_WINNERS,
  eventId,
});

export const getWinnersSuccess = (winnersData) => ({
  type: types.GET_WINNERS_SUCCESS,
  winnersData,
});

export const getWinnersFailure = (error) => ({
  type: types.GET_WINNERS_FAILURE,
  error,
});
