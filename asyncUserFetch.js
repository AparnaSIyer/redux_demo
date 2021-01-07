const redux = require('redux');
const createStore = redux.createStore;
const axios = require('axios');
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESSFUL = 'FETCH_USERS_SUCCESSFUL';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const initialState = {
    loading: false,
    users: [],
    error: ''
};

console.log(thunkMiddleware);
//thunk middleware allows action creators to return a function instead of action object.
// this one is a "thunk" because it defers work for later:
fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest());
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                const users = response.data.map((user) => user.id);
                dispatch(fetchUsersSuccess(users));
            })
            .catch((error) => {
                dispatch(fetchUsersFailure(error.message));
            });
    };
};

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    };
};

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESSFUL,
        payload: users
    };
};

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_USERS_SUCCESSFUL:
            return {
                loading: false,
                users: action.payload,
                error: ''
            };
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            };
    }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
    console.log(store.getState());
});
store.dispatch(fetchUsers());
