import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import wordReducer from './reducers/word';
import gameReducer from './reducers/game';

const store = createStore(
    combineReducers({
        game: gameReducer,
        word: wordReducer
    }),
    applyMiddleware(thunk)
);

export default store;