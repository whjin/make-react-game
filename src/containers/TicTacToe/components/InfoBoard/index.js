import React from 'react';
import PropTypes from 'prop-types';
import Circle from '../Circle';
import Cross from '../Cross';
import {
    CIRCLE,
    CROSS,
    PLAYER_1,
} from '../../constants';
import {
    StyledInfoBoard,
} from './Styled';
import gtag from '../../../../utils/tracking';

const showContent = (value) => {
    const theme = {
        scaleFactor: 5,
    };
    if (value === CIRCLE) {
        return <Circle theme={theme}/>
    } else if (value === CROSS) {
        return <Cross theme={theme}/>
    }
    return null;
};

const InfoBoard = ({currentRole, isWin}) => {
    if (isWin.get('isGameFinished')) {
        if (isWin.get('winner')) {
            const role = isWin.get('winner') === CIRCLE ? 'CIRCLE' : 'CROSS';
            gtag('event', 'InfoBoard', {
                'event_category': `${role} win`,
                'event_label': isWin.get('winCaseArr').toJS(),
            });
            return (
                <StyledInfoBoard>
                    <span className="info-board__label">获胜者是</span>
                    <div className="info-board__content-wrapper">
                        {showContent(isWin.get('winner'))}
                    </div>
                </StyledInfoBoard>
            );
        }
        gtag('event', 'InfoBoard', {
            'event_category': '平手',
            'event_label': isWin.get('winCaseArr').toJS(),
        });
        return (
            <StyledInfoBoard>
                <span className="info-board__label">平手</span>
            </StyledInfoBoard>
        );
    }
    return (
        <StyledInfoBoard>
            <span className="info-board__label">轮到</span>
            <div className="info-board__content-wrapper">
                {showContent(currentRole)}
            </div>
        </StyledInfoBoard>
    );
};

InfoBoard.propTypes = {
    currentRole: PropTypes.number,
    isWin: PropTypes.object,
};

InfoBoard.defaultProps = {
    currentRole: PLAYER_1,
    isWin: null,
};

export default InfoBoard;
