import * as types from '../constants/actionTypes';
import { defaultFetchLimit, defaultOffset } from '../../helpers/defaults';

export const generateWinners = (eventId) => ({
    type: types.GENERATE_WINNERS,
    eventId,
});

export const generateWinnersSuccess = (winners) => ({
    type: types.GENERATE_WINNERS_SUCCESS,
    winners,
});

export const generateWinnersFailure = (error) => ({
    type: types.GENERATE_WINNERS_SUCCESS,
    error,
});

export const getWinners = () => ({
    type: types.GET_WINNERS,
});

export const getWinnersSuccess = (winners) => ({
    type: types.GET_WINNERS_SUCCESS,
    winners,
});

export const getWinnersFailure = (error) => ({
    type: types.GET_WINNERS_FAILURE,
    error,
});
