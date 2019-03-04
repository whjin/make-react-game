import {combineReducers} from 'redux-immutable';
import tictactoeReducer from '../containers/TicTacToe/reducer';

export default function createReducer(injectedReducers) {
    return combineReducers({
        tictactoe: tictactoeReducer,
    });
}