import {
    MESSAGES_GET_REQUEST,
    MESSAGES_GET_SUCCESS,
    MESSAGES_GET_FAILURE
} from '../actions/messages';

export default function article(state = {isFetching: false, messages: [], error: null}, action) {
    switch (action.type) {
        case MESSAGES_GET_REQUEST:
            /*ES6 Syntax for updating state with Object.assign(). */
            /* Create a new object, copy all props from old state and set isFetching to true */
            return Object.assign(
                {},
                state,
                {
                    isFetching: true
                }
            );
        case MESSAGES_GET_SUCCESS:
            /* Resolve promise with articles and create a new state with fetching:false, and articles from db*/
            return Object.assign(
                {},
                state,
                {
                    isFetching: false,
                    error: false,
                    messages: action.messages,
                });
        case MESSAGES_GET_FAILURE:
            return Object.assign(
                {},
                state,
                {
                    error: action.error,
                    isFetching: false
                });

        default:
            return state;
    }
}