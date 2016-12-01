'use strict';

let rythms = ['half','quarter','eighth','sixteenth'];
let notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'rest'];
let octaves = [0,1,2,3,4,5,6,7];

class Gene {

    constructor() {

        this.rythm = rythms[Math.floor(Math.random() * rythms.length)];
        this.pitch = notes[Math.floor(Math.random() * notes.length)];
        this.octave = octaves[Math.floor(Math.random() * octaves.length)];

    }

}

export default Gene;