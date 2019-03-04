import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import {getWinner} from './utils';

import {
    DEFAULT_GAME_SCALE,
    DEFAULT_WINNER_CONDITION,
} from './constants';
import _ from 'lodash';

const selectTicTacToe = state => state.get('tictactoe');

const makeSelectGameScale = () =>
    createSelector(selectTicTacToe, tictactoeState =>
        tictactoeState.get('gameScale'),
    );

const makeSelectBlocks = () =>
    createSelector(selectTicTacToe, tictactoeState =>
        tictactoeState.get('blocks'),
    );

const makeSelectCurrentRole = () =>
    createSelector(selectTicTacToe, tictactoeState =>
        tictactoeState.get('currentRole'),
    );

const makeSelectIsWin = () =>
    createSelector(selectTicTacToe, tictactoeState => {
        const blocks = tictactoeState.get('blocks');
        const winnerCondition = tictactoeState.get('winnerCondition');
        const gameScale = tictactoeState.get('gameScale');
        const isWin = getWinner(blocks, gameScale, winnerCondition);
        return fromJS(isWin);
    });

const makeSelectIsSinglePlayer = () =>
    createSelector(selectTicTacToe, tictactoeState =>
        tictactoeState.get('isSinglePlayer'),
    );

const makeSelectGameScaleOptions = () =>
    createSelector(selectTicTacToe, tictactoeState => {
        const options = _.range(DEFAULT_GAME_SCALE, 20 + 1);
        return options;
    });

const makeSelectWinnerConditionOptions = () =>
    createSelector(selectTicTacToe, tictactoeState => {
        const gameScale = tictactoeState.get('gameScale');
        const options = _.range(DEFAULT_WINNER_CONDITION, gameScale + 1);
        return options;
    });

export {
    makeSelectGameScale,
    makeSelectBlocks,
    makeSelectCurrentRole,
    makeSelectIsWin,
    makeSelectIsSinglePlayer,
    makeSelectGameScaleOptions,
    makeSelectWinnerConditionOptions,
};
