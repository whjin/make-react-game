import React from 'react';
import PropTypes from 'prop-types';
import {
    StyledCross,
} from './Styled';

const Cross = ({theme}) => (
    <StyledCross theme={theme}>
        <span className="cross__cross"/>
    </StyledCross>
);

Cross.propTypes = {
    theme: PropTypes.object,
    handleOnToggleSwitchClick: PropTypes.func,
};

Cross.defaultProps = {
    theme: null,
};

export default Cross;
