import React from 'react';
import PropTypes from 'prop-types';
import {
    StyledCircle,
} from './Styled';

const Circle = ({theme}) => (
    <StyledCircle theme={theme}>
        <span className="circle__circle"/>
    </StyledCircle>
);

Circle.propTypes = {
    theme: PropTypes.object,
    handleOnToggleSwitchClick: PropTypes.func,
};

Circle.defaultProps = {
    theme: null,
};

export default Circle;
