

import { chessPieceTypes } from './constants';
import { getPieceOnSquare } from './chessReducer';

export function canMoveDiagonally(x, y, deltaXY, xSign, ySign, positions) {
   
    if (deltaXY === 1) { return true; }
    for (let i = 1; i < deltaXY; i += 1) {
        if (getPieceOnSquare(positions, x + (xSign * i), y + (ySign * i))) {
            return false;
        }
    }
    return true;
}

export function canMoveHorizontally(x, y, deltaX, xSign, positions) {
   
    if (deltaX === 1) { return true; }
    for (let i = 1; i < deltaX; i += 1) {
        if (getPieceOnSquare(positions, x + (xSign * i), y)) {
            return false;
        }
    }
    return true;
}

export function canMoveVertically(x, y, deltaY, ySign, positions) {
   
    if (deltaY === 1) { return true; }
    for (let i = 1; i < deltaY; i += 1) {
        if (getPieceOnSquare(positions, x, y + (ySign * i))) {
            return false;
        }
    }
    return true;
}

export function validMove(pieceType, pieceId, toX, toY, positions, chessPieces) {
    const [x, y] = positions[pieceId];

    const pieceOnSquareId = getPieceOnSquare(positions, toX, toY);
    if (pieceOnSquareId) {
        if (chessPieces[pieceOnSquareId].dark === chessPieces[pieceId].dark) {
            return false;
        }
    }

    const dx = toX - x;
    const dy = toY - y;

    const deltaX = Math.abs(dx);
    const deltaY = Math.abs(dy);
    if (deltaX === 0 && deltaY === 0) { return false; }

    const xSign = dx / deltaX;
    const ySign = dy / deltaY;

    switch (pieceType) {
        case chessPieceTypes.KING:
            return (deltaX === 1 && deltaY === 1)
                || (deltaX === 1 && deltaY === 0)
                || (deltaX === 0 && deltaY === 1);

        case chessPieceTypes.QUEEN:
            if (deltaX === deltaY) {
                return canMoveDiagonally(x, y, deltaX, xSign, ySign, positions);
            } else if (deltaX !== 0 && deltaY === 0) {
                return canMoveHorizontally(x, y, deltaX, xSign, positions);
            } else if (deltaX === 0 && deltaY !== 0) {
                return canMoveVertically(x, y, deltaY, ySign, positions);
            }
            return false;

        case chessPieceTypes.ROOK:
            if (deltaY === 0) {
                return canMoveHorizontally(x, y, deltaX, xSign, positions);
            } else if (deltaX === 0) {
                return canMoveVertically(x, y, deltaY, ySign, positions);
            } return false;

        case chessPieceTypes.BISHOP:
            if (deltaX !== deltaY) {
                return false;
            } return canMoveDiagonally(x, y, deltaX, xSign, ySign, positions);

        case chessPieceTypes.KNIGHT:
            return (deltaX === 2 && deltaY === 1)
                || (deltaX === 1 && deltaY === 2);

        case chessPieceTypes.PAWN:
            if (chessPieces[pieceId].firstMove) {
                if ((chessPieces[pieceId].dark && dy === 2)
                    || (!chessPieces[pieceId].dark && dy === -2)) {
                    return dx === 0 && !pieceOnSquareId;
                }
            }
            if ((chessPieces[pieceId].dark && dy !== 1)
                || (!chessPieces[pieceId].dark && dy !== -1)) {
                return false;
            } else if (!pieceOnSquareId) {
                return dx === 0;
            } return deltaX === 1;

        default:
            return false;
    }
}
