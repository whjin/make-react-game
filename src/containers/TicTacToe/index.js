import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {List, Map} from 'immutable';
import _ from 'lodash';

import {
    DEFAULT_GAME_SCALE,
} from './constants';

import {StyledTicTacToe} from './Styled';
import {
    makeSelectGameScale,
    makeSelectBlocks,
    makeSelectCurrentRole,
    makeSelectIsWin,
    makeSelectIsSinglePlayer,
    makeSelectGameScaleOptions,
    makeSelectWinnerConditionOptions,
} from './selectors';
import {
    setBlockValue,
    setInit,
    setGameScale,
    setWinnerCondition,
    setIsSinglePlayer,
} from './actions';
import {
    CIRCLE,
    CROSS,
} from './constants';

import Circle from './components/Circle';
import Cross from './components/Cross';
import Selection from './components/Selection';
import ToggleSwitchBtn from './components/ToggleSwitchBtn';
import InfoBoard from './components/InfoBoard';
import gtag from '../../utils/tracking';

const showContent = (value, gameScale) => {
    const theme = {
        scaleFactor: gameScale,
    };
    if (value === CIRCLE) {
        return <Circle theme={theme}/>
    } else if (value === CROSS) {
        return <Cross theme={theme}/>
    }
    return null;
};

const blockStyle = (id, winCaseArrs) => {
    let isWinnerBlock = false;
    if (winCaseArrs.size) {
        winCaseArrs.forEach((winCaseArr) => {
            if (winCaseArr.includes(id)) {
                isWinnerBlock = true;
            }
        });
    }

    if (isWinnerBlock) {
        return 'tic-tac-toe__item tic-tac-toe__item-win';
    }
    return 'tic-tac-toe__item';
};

class TicTacToe extends React.Component {
    static propTypes = {
        gameScale: PropTypes.number,
        blocks: PropTypes.instanceOf(List),
        currentRole: PropTypes.number,
        isWin: PropTypes.instanceOf(Map),
        isSinglePlay: PropTypes.bool,
        gameScaleOptions: PropTypes.array,
        winnerConditionOptions: PropTypes.array,
        handleOnBlockClicked: PropTypes.func,
        handleOnRestartGame: PropTypes.func,
        handleOnSetGameScale: PropTypes.func,
        handleOnSetWinnerCondition: PropTypes.func,
        handleOnSetIsSinglePlay: PropTypes.func,
    };
    static defaultProps = {
        gameScale: DEFAULT_GAME_SCALE,
        blocks: List(),
        currentRole: 0,
        isWin: Map(),
        isSinglePlay: true,
        gameScaleOptions: [],
        winnerConditionOptions: [],
        handleOnBlockClicked: () => {
        },
        handleOnRestartGame: () => {
        },
        handleOnSetGameScale: () => {
        },
        handleOnSetWinnerCondition: () => {
        },
        handleOnSetIsSinglePlay: () => {
        },
    };
    handleOnClick = (event) => {
        const {blocks, handleOnBlockClicked} = this.props;
        const id = event.currentTarget.getAttribute('data-id');
        if (!blocks.getIn([id, 'owner'])) {
            gtag('event', 'onClick Block', {
                'event_category': 'id',
                'event_label': id,
            });
            handleOnBlockClicked(id);
        }
    };
    handleOnGameScaleSelected = (event) => {
        const {handleOnSetGameScale} = this.props;
        const gameScale = parseInt(event.target.value, 10);
        gtag('event', 'Selection', {
            'event_category': 'gameScale',
            'event_label': gameScale,
        });
        handleOnSetGameScale(gameScale);
    };
    handleOnWinnerConditionSelected = (event) => {
        const {handleOnSetWinnerCondition} = this.props;
        const winnerCondition = parseInt(event.target.value, 10);
        gtag('event', 'Selection', {
            'event_category': 'winnerCondition',
            'event_label': winnerCondition,
        });
        handleOnSetWinnerCondition(winnerCondition);
    };
    handleOnToggleSwitchClick = () => {
        const {
            isSinglePlay,
            handleOnSetIsSinglePlay,
        } = this.props;
        gtag('event', 'ToggleSwitch', {
            'event_category': 'isSinglePlay',
            'event_label': !isSinglePlay,
        });
        handleOnSetIsSinglePlay();
    };
    handleOnRestartClick = () => {
        const {
            handleOnRestartGame,
        } = this.props;
        gtag('event', 'restart');
        handleOnRestartGame();
    };

    render() {
        const {
            gameScale,
            blocks,
            isWin,
            isSinglePlay,
            currentRole,
            winnerConditionOptions,
        } = this.props;
        const gameScaleOptions = _.range(DEFAULT_GAME_SCALE, 20 + 1);

        return (
            <StyledTicTacToe gameScale={gameScale}>
                <InfoBoard currentRole={currentRole} isWin={isWin}/>
                <div className="tic-tac-toe__blocks-wrapper">
                    {
                        blocks.map((block) => (
                            <div
                                key={block.get('id')}
                                data-id={block.get('id')}
                                className={blockStyle(block.get('id'), isWin.get('winCaseArr'))}
                                onClick={isWin.get('isGameFinished') ? () => {
                                } : this.handleOnClick}
                            >
                                {showContent(block.get('owner'), gameScale)}
                            </div>
                        ))
                    }
                </div>
                <button
                    className="tic-tac-toe__restart-btn"
                    onClick={this.handleOnRestartClick}
                >
                    Restart
                </button>
                <div className="tic-tac-toe__setting-group-wrapper">
                    <div className="tic-tac-toe__setting-group">
                        <span>Scale</span>
                        <Selection options={gameScaleOptions} handleOnSelect={this.handleOnGameScaleSelected}/>
                    </div>
                    <div className="tic-tac-toe__setting-group">
                        <span>Condition</span>
                        <Selection options={winnerConditionOptions}
                                   handleOnSelect={this.handleOnWinnerConditionSelected}/>
                    </div>
                    <div className="tic-tac-toe__setting-group">
                        <span>Single Play</span>
                        <ToggleSwitchBtn isSinglePlay={isSinglePlay}
                                         handleOnToggleSwitchClick={this.handleOnToggleSwitchClick}/>
                    </div>
                </div>
            </StyledTicTacToe>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    gameScale: makeSelectGameScale(),
    blocks: makeSelectBlocks(),
    currentRole: makeSelectCurrentRole(),
    isWin: makeSelectIsWin(),
    isSinglePlay: makeSelectIsSinglePlayer(),
    gameScaleOptions: makeSelectGameScaleOptions(),
    winnerConditionOptions: makeSelectWinnerConditionOptions(),
});

const mapDispatchToProps = dispatch => ({
    handleOnBlockClicked: (id) =>
        dispatch(setBlockValue(id)),
    handleOnRestartGame: () => dispatch(setInit()),
    handleOnSetGameScale: (gameScale) => dispatch(setGameScale(gameScale)),
    handleOnSetWinnerCondition: (winnerCondition) => dispatch(setWinnerCondition(winnerCondition)),
    handleOnSetIsSinglePlay: () => dispatch(setIsSinglePlayer()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TicTacToe);
