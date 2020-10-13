
import React, { Component } from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './../reducers';

import ChessGame from '../chess/Game';

class BoardRootContainer extends Component {
    constructor(props) {
        super(props);
        this.store = createStore(
            reducers,
            compose(
                applyMiddleware(thunk),
                window.devToolsExtension ? window.devToolsExtension() : f => f,
            )
        );
    }

    render() {
        return (<Provider store={this.store}>
            <ChessGame />
        </Provider>);
    }
}

export default BoardRootContainer;
