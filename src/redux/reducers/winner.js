import * as types from '../constants/actionTypes';

const initialState = {
    winners: [],
    success: false,
    message: '',
    error: {
        message: '',
        errors: [],
    },
    isLoading: false,
};

const winner = (state = initialState, action) => {
    switch (action.type) {
    case types.GENERATE_WINNERS:
        return {
            ...state,
            isLoading: true,
            success: false,
        };
    case types.GENERATE_WINNERS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            success: true,
            winners: action.winners,
        };
    case types.GENERATE_WINNERS_FAILURE:
        return {
            ...state,
            isLoading: false,
            success: false,
            error: {
                message: action.message,
                errors: action.errors,
            },
        };
    case types.GET_WINNERS:
        return {
            ...state,
            isLoading: true,
            success: false,
        };
    case types.GET_WINNERS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            success: true,
            winners: action.winners,
        };
    case types.GET_WINNERS_FAILURE:
        return {
            ...state,
            isLoading: false,
            success: false,
            error: {
                message: action.message,
                errors: action.errors,
            },
        };

    default:
        return state;
    }
};

export default winner;
