import {
    ADD_PAYMENT_DETAILS_REQUEST,
    ADD_PAYMENT_DETAILS_SUCCESS,
    ADD_PAYMENT_DETAILS_FAILURE,
    GET_PAYMENT_DETAILS_REQUEST,
    GET_PAYMENT_DETAILS_SUCCESS,
    GET_PAYMENT_DETAILS_FAILURE,
    WITHDRAWAL_REQUEST,
    WITHDRAWAL_SUCCESS,
    WITHDRAWAL_FAILURE,
    WITHDRAWAL_PROCEED_REQUEST,
    WITHDRAWAL_PROCEED_SUCCESS,
    WITHDRAWAL_PROCEED_FAILURE,
    GET_WITHDRAWAL_HISTORY_REQUEST,
    GET_WITHDRAWAL_HISTORY_SUCCESS,
    GET_WITHDRAWAL_HISTORY_FAILURE,
    GET_WITHDRAWAL_REQUEST_REQUEST,
    GET_WITHDRAWAL_REQUEST_SUCCESS,
    GET_WITHDRAWAL_REQUEST_FAILURE
} from "./ActionTypes";

const initialState = {
    loading: false,
    error: null,
    paymentDetails: {
        accountHolderName: "",
        ifsc: "",
        accountNumber: "",
        bankName: ""
    },
    withdrawalHistory: [],
    withdrawalRequests: [],
    withdrawal: null,
    proceedResponse: null
};

const withdrawalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PAYMENT_DETAILS_REQUEST:
        case GET_PAYMENT_DETAILS_REQUEST:
        case WITHDRAWAL_REQUEST:
        case WITHDRAWAL_PROCEED_REQUEST:
        case GET_WITHDRAWAL_HISTORY_REQUEST:
        case GET_WITHDRAWAL_REQUEST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case ADD_PAYMENT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                paymentDetails: action.payload
            };

        case GET_PAYMENT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                paymentDetails: action.payload
            };

        case WITHDRAWAL_SUCCESS:
            return {
                ...state,
                loading: false,
                withdrawal: action.payload
            };

        case WITHDRAWAL_PROCEED_SUCCESS:
            return {
                ...state,
                loading: false,
                proceedResponse: action.payload
            };

        case GET_WITHDRAWAL_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                withdrawalHistory: action.payload
            };

        case GET_WITHDRAWAL_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                withdrawalRequests: action.payload
            };

        case ADD_PAYMENT_DETAILS_FAILURE:
        case GET_PAYMENT_DETAILS_FAILURE:
        case WITHDRAWAL_FAILURE:
        case WITHDRAWAL_PROCEED_FAILURE:
        case GET_WITHDRAWAL_HISTORY_FAILURE:
        case GET_WITHDRAWAL_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default withdrawalReducer;
