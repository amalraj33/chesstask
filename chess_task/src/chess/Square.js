

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Square extends Component {
    static propTypes = {
        children: PropTypes.node,
        dark: PropTypes.bool,
    };

    static defaultProps = {
        children: null,
        dark: false,
    }

    render() {
        const { dark, children } = this.props;

        const squareStyle = {
            width: '30px',
            height: '30px',
            backgroundColor: dark ? '#663300' : '#cc8800',
            padding: '10px',
            textAlign: 'center',
        };

        return <div style={squareStyle}>{children}</div>;
    }
}
