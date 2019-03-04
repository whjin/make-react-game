import {
    INIT,
    SET_BLOCK_VALUE,
    SET_GAME_SCALE,
    SET_WINNER_CONDITION,
    SET_WINNER,
    SET_IS_SINGLE_PLAYER,
} from './constants';

export const setInit = () => ({
    type: INIT,
});

export const setBlockValue = (id) => ({
    type: SET_BLOCK_VALUE,
    payload: id,
});

export const setGameScale = (payload) => ({
    type: SET_GAME_SCALE,
    payload,
});

export const setWinnerCondition = (payload) => ({
    type: SET_WINNER_CONDITION,
    payload,
});

export const setWinner = (isWin) => ({
    type: SET_WINNER,
    payload: isWin,
});

export const setIsSinglePlayer = () => ({
    type: SET_IS_SINGLE_PLAYER,
});
