'use strict';

import React from 'react';
import Player from './Components/Player.jsx';
import Population from './Genetics/Population.js';

class App extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            melodyIndex: 0
        };
        this.play = this.play.bind(this);
        this.pick = this.pick.bind(this);

        this.melodies = new Population();
        this.melodies.init();

        this.conductor = new BandJS();
        this.conductor.setTimeSignature(4,4);
        this.conductor.setTempo(120);

    }

    play(index) {

        if(this.player) this.player.stop();
        this.conductor.instruments = [];

        this.compose(this.melodies.individuals[index]);

        this.player = this.conductor.finish();
        this.player.loop(true);
        this.player.play();

    }

    compose(melody) {
        
        let piano = this.conductor.createInstrument();

        for(let note of melody.genes) {

            if(note.pitch !== 'rest') {

                piano.note(note.rythm, note.pitch + note.octave);
                
            } else {

                piano.rest(note.rythm);

            }

        }

    }

    pick(index) {

        this.melodies.individuals[index].fitness++;

    }

    render() {

        let players = [];

        for(let i = 0; i < 4; i++) {

            players.push(

                <Player key={i} id={i} play={this.play} pick={this.pick} />

            );

        }

        return (

            <div className="grid-block vertical">
                <div className="grid-block">
                    {players}
                </div>
                <button className="grid-block align-center" onClick={this.melodies.reproduce}>generate</button>
            </div>

        );

    }

}

export default App;