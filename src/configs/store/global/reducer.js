import {
    INITIAL_STATE
} from "./type";

const initiate = {
    provinces: [],
    categories: [],
    initLoading: true,
}

const GlobalReducer = (state = initiate, action) => {
    switch (action.type) {
        case INITIAL_STATE:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

export default GlobalReducer;