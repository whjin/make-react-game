import React from 'react';
import PropTypes from 'prop-types';
import {
    StyledToggleSwitchBtn,
} from './Styled';

const ToggleSwitchBtn = ({isSinglePlay, handleOnToggleSwitchClick}) => {
    const circleStyle = isSinglePlay ?
        'tic-tac-toe__toggle-switch-btn-circle' : 'tic-tac-toe__toggle-switch-btn-circle-left';
    return (
        <StyledToggleSwitchBtn isSinglePlay={isSinglePlay} onClick={handleOnToggleSwitchClick}>
            <div className="tic-tac-toe__toggle-switch-btn-container">
                <div className={circleStyle}/>
            </div>
        </StyledToggleSwitchBtn>
    )
};

ToggleSwitchBtn.propTypes = {
    isSinglePlay: PropTypes.bool,
    handleOnToggleSwitchClick: PropTypes.func,
};

ToggleSwitchBtn.defaultProps = {
    isSinglePlay: true,
    handleOnToggleSwitchClick: () => {
    },
};

export default ToggleSwitchBtn;
