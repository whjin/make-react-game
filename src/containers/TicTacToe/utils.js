import {
    CIRCLE,
    CROSS,
} from './constants';

const _ = require('lodash');

const getWinCase = (blocks, arrs, winnerCondition) => {
    let result = {};
    result[CIRCLE] = [];
    result[CROSS] = [];
    let blockId = 0;

    arrs.forEach((arr) => {
        let winCaseArr = [];
        let prevPlayer = blocks.getIn([blockId, 'owner']);
        let currentPlayer = blocks.getIn([blockId, 'owner']);
        let isContinuous;
        arr.forEach((element) => {
            blockId = element;
            currentPlayer = blocks.getIn([blockId, 'owner']);
            isContinuous = (prevPlayer === currentPlayer);
            if (isContinuous) {
                if (currentPlayer) {
                    winCaseArr.push(blocks.getIn([blockId, 'id']));
                } else {
                    winCaseArr = [];
                }
            } else {
                if (currentPlayer) {
                    if (prevPlayer && (winCaseArr.length >= winnerCondition)) {
                        result[prevPlayer].push([...winCaseArr]);
                    }
                    winCaseArr = [];
                    winCaseArr.push(blocks.getIn([blockId, 'id']));
                    prevPlayer = currentPlayer;
                } else {
                    if (prevPlayer && (winCaseArr.length >= winnerCondition)) {
                        result[prevPlayer].push([...winCaseArr]);
                    }
                    winCaseArr = [];
                    prevPlayer = currentPlayer;
                }
            }
        });
        if (winCaseArr.length >= winnerCondition) {
            result[currentPlayer].push([...winCaseArr]);
        }
    });
    return result;
};

const rowCheck = (blocks, gameScale, winnerCondition) => {
    const arrs = _.range(0, gameScale)
        .map((item) => {
            return _.range(item * gameScale, (item + 1) * gameScale);
        });
    return getWinCase(blocks, arrs, winnerCondition);
};

const colCheck = (blocks, gameScale, winnerCondition) => {
    const arrs = _.range(0, gameScale)
        .map((item) => {
            return _.range(item, item + gameScale * (gameScale - 1) + 1, gameScale);
        });
    return getWinCase(blocks, arrs, winnerCondition);
};

const forwardSlashCheck = (blocks, gameScale, winnerCondition) => { /* / */
    const firstHeaders = _.range(0, gameScale);
    const secondHeaders = _.range(gameScale * 2 - 1, gameScale * gameScale, gameScale);
    const firstArr = firstHeaders.map((header, index) => (
        _.range(header, index * gameScale + 1, gameScale - 1)
    ));
    const secondArr = secondHeaders.map((header, index) => (
        _.range(header, header + (secondHeaders.length - index) * (gameScale - 1), gameScale - 1)
    ));
    const arrs = [...firstArr, ...secondArr];
    return getWinCase(blocks, arrs, winnerCondition);
};

const backSlashCheck = (blocks, gameScale, winnerCondition) => { /* \ */
    const firstHeaders = _.range(0, gameScale).sort((a, b) => b - a);
    const secondHeaders = _.range(gameScale, gameScale * (gameScale - 1) + 1, gameScale);
    const firstArr = firstHeaders.map((header, index) => (
        _.range(header, (index + 1) * gameScale, gameScale + 1)
    ));
    const secondArr = secondHeaders.map((header, index) => (
        _.range(header, header + (secondHeaders.length - index) * (gameScale + 1), gameScale + 1)
    ));
    const arrs = [...firstArr, ...secondArr];
    return getWinCase(blocks, arrs, winnerCondition);
};

export const getWinner = (blocks, gameScale, winnerCondition) => {
    let winner;
    let winCaseArr = [];
    let isGameFinished = false;
    const rowResult = rowCheck(blocks, gameScale, winnerCondition);
    const colResult = colCheck(blocks, gameScale, winnerCondition);
    const forwardSlashResult = forwardSlashCheck(blocks, gameScale, winnerCondition);
    const backSlashResult = backSlashCheck(blocks, gameScale, winnerCondition);
    const results = [rowResult, colResult, forwardSlashResult, backSlashResult];
    results.forEach((result) => {
        if (result[CIRCLE].length) {
            winCaseArr.push(...result[CIRCLE]);
            winner = CIRCLE;
            isGameFinished = true;
        }
        if (result[CROSS].length) {
            winCaseArr.push(...result[CROSS]);
            winner = CROSS;
            isGameFinished = true;
        }
    });
    if (!blocks.find((block) => block.get('owner') === undefined)) {
        isGameFinished = true;
    }
    return {
        winner,
        winCaseArr,
        isGameFinished,
    };
};

export const getBlockId = blocks => {
    const enableBlocks = blocks.filter(block => block.get('owner') === undefined);
    const choosedId = enableBlocks
        .get(Math.floor(Math.random() * enableBlocks.size))
        .get('id');
    return choosedId;
};
