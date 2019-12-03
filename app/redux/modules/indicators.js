const SET_LOADER = 'SET_LOADER';

export function setLoader(data) {
    return {
        type: SET_LOADER,
        data,
    };
}

const initialState = {
    isLoading: false,
};

export default function loader(state = initialState, action) {
    switch (action.type) {
        case SET_LOADER:
            return {
                ...state,
                isLoading: action.data,
            };

        default:
            return state;
    }
}
