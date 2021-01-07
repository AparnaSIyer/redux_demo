const redux = require('redux');
const reduxLogger = require('redux-logger');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const combineReducers = redux.combineReducers;
const logger = reduxLogger.createLogger();
const BUY_BOOK = 'BUY_BOOK';
const BUY_SIPPER = 'BUY_SIPPER';
function buyBook() {
    return {
        type: BUY_BOOK,
        info: 'My first redux action'
    };
}

function buySipper() {
    return { type: BUY_SIPPER, info: 'This is business' };
}
//create initial state value (numOfBooks=10)

const intialSipperState = {
    numOfSippers: 20
};

const initialBookState = { numOfBooks: 10 };
//create reducer that contains the cases for different actions that we would pass

const bookReducer = (state = initialBookState, action) => {
    switch (action.type) {
        case BUY_BOOK:
            return {
                ...state,
                numOfBooks: state.numOfBooks - 1
            };

        //also define a default state when none of the state matches
        default:
            return state;
    }
};

const sipperReducer = (state = intialSipperState, action) => {
    switch (action.type) {
        case BUY_SIPPER:
            return {
                ...state,
                numOfSippers: state.numOfSippers - 1
            };

        //also define a default state when none of the state matches
        default:
            return state;
    }
};

const rootReducer = combineReducers({ book: bookReducer, sipper: sipperReducer });
//create store by importing
const store = createStore(rootReducer, applyMiddleware(logger));
//console log initial state
console.log('Initial state', store.getState());

//The app should subscribe to the changes in the store
const unsubscribe = store.subscribe(() => {});

// Dispatch the action
store.dispatch(buyBook());
store.dispatch(buySipper());
store.dispatch(buySipper());
//to unsubscribe the app from store for changes
unsubscribe();
