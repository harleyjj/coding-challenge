import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import wordReducer from './reducers/word';
import gameReducer from './reducers/game';

const store = createStore(
    combineReducers({
        form: formReducer,
        game: gameReducer,
        word: wordReducer
    }),
    applyMiddleware(thunk)
);

export default store;