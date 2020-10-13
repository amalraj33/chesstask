

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect as reduxConnect } from 'react-redux';
import { DragSource } from 'react-dnd';


import { itemTypes, chessUnicode } from './constants';

const pieceSource = {
    beginDrag(props) {
        return {
            pieceId: props.id,
            pieceType: props.type,
        };
    },
    canDrag(props) {
        return props.dark === props.darkTurn;
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
        canDrag: monitor.canDrag(),
    };
}

class Piece extends Component {
    static propTypes = {
        dark: PropTypes.bool,
        id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['KING', 'QUEEN', 'ROOK', 'BISHOP', 'KNIGHT', 'PAWN']).isRequired,
        // from drag and drop
        connectDragSource: PropTypes.func.isRequired,
        connectDragPreview: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        canDrag: PropTypes.bool.isRequired,
        // from state
        darkTurn: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        dark: false,
    }

    render() {
        const {
            dark,
            type,
            connectDragSource,
            isDragging,
            canDrag,
        } = this.props;
        const pieceStyle = {
            opacity: isDragging ? 0.3 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: canDrag ? 'move' : 'default',
            color: dark ? 'black' : 'white',
        };
        return connectDragSource(
            <span style={pieceStyle}>{String.fromCharCode(chessUnicode[type])}</span>
        );
    }
}

function mapStateToProps(state) {
    return {
        darkTurn: state.chess.darkTurn,
    };
}

export default reduxConnect(mapStateToProps)(DragSource(itemTypes.PIECE, pieceSource, collect)(Piece));
