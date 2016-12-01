'use strict';

import React from 'react';

class Player extends React.Component {

    constructor(props) {

        super(props);
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePick = this.handlePick.bind(this);

    }

    handlePlay() {

        this.props.play(this.props.id);

    }

    handlePick() {

        this.props.pick(this.props.id);

    }

    render() {

        return (

            <div className="grid-block vertical">
                <button className="grid-block align-center" onClick={this.handlePlay}>play</button>
                <button className="grid-block shrink align-center" onClick={this.handlePick}>pick</button>
            </div>

        );

    }

}

export default Player;