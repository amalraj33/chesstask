
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GameBoard from './Board';
import { startNewGame as newGameAction } from './chessActions';

const StyledGame = styled.div`
    .game {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .description {
        width: 340px;
        margin: 30px;
        padding: 0px 20px 20px;
        text-align: center;
        border: 2px solid black;
        border-radius: 10px;
    }
    .sub-header {
        font-size: 14px;
        padding: 10px;
    }
    .game-board {
        position: relative;
    }
    .board-cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 400px;
        height: 400px;
        background-color: black;
        opacity: 0.5;
        z-index: 1;
    }
`;

export class Game extends Component {
    static propTypes = {
        darkTurn: PropTypes.bool.isRequired,
        gameWinner: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string,
        ]).isRequired,
        startNewGame: PropTypes.func.isRequired,
    }

    renderText() {
        const { darkTurn, gameWinner, startNewGame } = this.props;

        const darkSpan = <span style={{ fontWeight: 'bold', color: 'black' }}>black</span>;
        const lightSpan = <span style={{ fontWeight: 'bold', color: 'white', backgroundColor: 'black' }}>white</span>;

        if (!gameWinner) {
            return (
                <div className="description">
                    <h1>Welcome to Chess</h1>
                    <div className="sub-header" >
                        <span>{"It's the "}</span>
                        {darkTurn ? darkSpan : lightSpan}
                        <span>{" pieces' turn."}</span>
                    </div>
                    <Button onClick={startNewGame}>Reset Board</Button>
                </div>
            );
        }
        return (
            <div className="description">
                <h1>Game Over</h1>
                <div className="sub-header" >
                        <span>The </span>
                        {gameWinner === 'dark' ? darkSpan : lightSpan}
                        <span> pieces won.</span>
                    </div>
                <Button onClick={startNewGame}>Reset Board</Button>
            </div>
        );
    }

    render() {
        const { gameWinner } = this.props;
        return (<StyledGame>
            <div className="game">
                {this.renderText()}
                <GameBoard popupContent={gameWinner ? <h1 style={{ color: 'white' }}>Game Over</h1> : null} />
            </div>
        </StyledGame>);
    }
}

function mapStateToProps(state) {
    return {
        darkTurn: state.chess.darkTurn,
        gameWinner: state.chess.gameWinner,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        startNewGame: newGameAction,
    }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Game));
