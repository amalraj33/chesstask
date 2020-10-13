
import { actionTypes } from './constants';

export function movePiece(pieceId, toX, toY) {
    return {
        type: actionTypes.MOVE_PIECE,
        pieceId,
        toX,
        toY,
    };
}

export function capturePiece(pieceId) {
    return {
        type: actionTypes.CAPTURE_PIECE,
        pieceId,
    };
}

export function startNewGame() {
    return {
        type: actionTypes.NEW_GAME,
    };
}

export function changePieceType(pieceId, newPieceType) {
    return {
        type: actionTypes.CHANGE_PIECE_TYPE,
        pieceId,
        newPieceType,
    };
}
