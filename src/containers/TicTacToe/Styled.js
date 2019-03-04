import styled, {keyframes} from 'styled-components';
import {
    THEME,
    THEME_DARKEN,
    BACKGROUND_COLOR,
} from '../StyleConstants';
import {
    GAME_WRAPPER_SIZE,
} from './constants';

const winnerBackground = keyframes`
    from {
        background: ${THEME_DARKEN};
    }

    to {
        background: ${THEME};
    }
`;

const crossMixin = (gameScale, angle) => `
    content: '';
    border-radius: 10px;
    width: 110%;
    background: black;
    position: absolute;
    height: ${ 4.5 / gameScale }em;
    transform: rotate(${angle}deg);
`;

export const StyledTicTacToe = styled.div`
    .tic-tac-toe__blocks-wrapper {
        width: ${GAME_WRAPPER_SIZE}px;
        height: ${GAME_WRAPPER_SIZE}px;
        @media only screen and (max-width: 600px) {
            width: calc(100vw - 20px);
            height: calc(100vw - 20px);
        }
        display: grid;
        ${(props) => {
    const gameScale = props.gameScale;
    return `
                grid-template-columns: repeat(${gameScale}, 1fr);
                grid-template-rows: repeat(${gameScale}, 1fr);
                grid-gap: ${45 / gameScale}px ${45 / gameScale}px;
            `;
}}
    }
    .tic-tac-toe__item {
        outline: none;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        width: 100%;
        height: 100%;

        background: ${THEME};
        cursor: pointer;
        &:hover {
            background: ${THEME_DARKEN};
        }
    }
    .tic-tac-toe__item-win {
        animation: ${winnerBackground} 0.5s linear infinite alternate;
    }
    .tic-tac-toe__cross-wrapper {
        height: 80%;
        width: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        .cross {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            &:before {
                ${(props) => {
    const gameScale = props.gameScale;
    return crossMixin(gameScale, 45);
}}
            }
            &:after {
                ${(props) => {
    const gameScale = props.gameScale;
    return crossMixin(gameScale, -45);
}}
            }
        }
    }
    
    .tic-tac-toe__restart-btn {
        font-family: 'Rammetto One', cursive;
        width: 100%;
        line-height: 50px;
        font-size: 1.5em;
        letter-spacing: 1px;
        background: white;
        cursor: pointer;
        outline: none;
        margin: 10px 0;
        padding: 5px 0;
        border-radius: 5px;
        border: none;
        transition: all 0.25s ease-out;
        &:hover {
            box-shadow: 0 10px 20px 0 ${BACKGROUND_COLOR};
            transform: translateY(-1px);
            color: ${THEME_DARKEN};
        }
    }
    .tic-tac-toe__setting-group-wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 40px);
        justify-content: space-between;
        font-family: 'Rammetto One', cursive;
        margin-bottom: 10px;
    }
    .tic-tac-toe__setting-group {
        display: flex;
        align-items: center;
        text-shadow: 2px 0px white;
        font-size: 1.2em;
        @media only screen and (max-width: 600px) {
            font-size: 0.9em;
        }
        span {
            margin-right: 5px;
        }
        select {
            font-size: 1.2em;
            outline: none;
            background: white;
        }
    }
`;
