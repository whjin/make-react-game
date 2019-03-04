import styled from 'styled-components';

export const StyledCircle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    width: 80%;
    .circle__circle {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: 100%;
        ${(props) => {
    return `
                border: ${ 4.5 / props.theme.scaleFactor }em solid white;
            `;
}}
    }
`;
