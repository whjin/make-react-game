import styled from 'styled-components';

const SIZE = 100;

export const StyledInfoBoard = styled.div`
    height: ${SIZE}px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff5e;
    margin: 10px 0px;
    font-weight: 900;
    text-shadow: 2px 0px white;
    .info-board__content-wrapper {
        height: ${SIZE}px;
        width: ${SIZE}px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .info-board__label {
        font-size: 3em;
        @media only screen and (max-width: 600px) {
            font-size: 2em;
        }
        letter-spacing: 15px;
        margin: 0px 20px;
    }
`;
