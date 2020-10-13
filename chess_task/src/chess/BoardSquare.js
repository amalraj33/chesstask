
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect as reduxConnect } from 'react-redux';

import { DropTarget } from 'react-dnd';

import Square from './Square';
import { validMove } from './gameRules';
import { movePiece, capturePiece } from './chessActions';
import { itemTypes, chessPieceTypes } from './constants';

const squareTarget = {
    canDrop(props, monitor) {
        const { x, y, positions, chessPieces } = props;
        const { pieceId, pieceType } = monitor.getItem();
        return validMove(pieceType, pieceId, x, y, positions, chessPieces);
    },
    drop(props, monitor) {
        const { children, y, switchPawn, chessPieces } = props;
        const { pieceId, pieceType } = monitor.getItem();
        if (children) {
            props.capturePiece(children.props.id);
        }
        if (pieceType === chessPieceTypes.PAWN) {
            if ((chessPieces[pieceId].dark && y === 7) || (!chessPieces[pieceId].dark && y === 0)) {
                switchPawn(pieceId);
            }
        }
        props.movePiece(pieceId, props.x, props.y);
    },
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    };
}

class BoardSquare extends Component {
    static propTypes = {
        children: PropTypes.node,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        switchPawn: PropTypes.func,
        // from drag and drop
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired,
        // from state
        positions: PropTypes.object.isRequired,
        chessPieces: PropTypes.object.isRequired,
        // from actions
        movePiece: PropTypes.func.isRequired,
        capturePiece: PropTypes.func.isRequired,
    };

    static defaultProps = {
        children: null,
        switchPawn: () => null,
    }

    renderOverlay(color) {
        const overlayStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.7,
            backgroundColor: color,
        };
        return (<div style={overlayStyle} />);
    }

    render() {
        const { x, y, connectDropTarget, isOver, canDrop } = this.props;
        const dark = (x + y) % 2 === 1;

        const styles = {
            square: {
                position: 'relative',
                width: '100%',
                height: '100%',
            },
        };

        return connectDropTarget(
            <div style={styles.square}>
                <Square dark={dark}>
                    {this.props.children}
                </Square>
                {isOver && !canDrop && this.renderOverlay('red')}
                {isOver && canDrop && this.renderOverlay('green')}
                {!isOver && canDrop && this.renderOverlay('yellow')}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        positions: state.chess.positions,
        chessPieces: state.chess.pieces,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        movePiece,
        capturePiece,
    }, dispatch);
}

export default reduxConnect(mapStateToProps, mapDispatchToProps)(DropTarget(itemTypes.PIECE, squareTarget, collect)(BoardSquare));
