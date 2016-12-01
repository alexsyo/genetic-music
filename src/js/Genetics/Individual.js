'use strict';

import Gene from './Gene.js';

class Individual {

    constructor() {

        this.genes = [];
        this.limit = 8;
        this.fitness = 0;
        this.init = this.init.bind(this);

    }

    init() {

        for(let i = 0; i < this.limit; i++) {

            let gene = new Gene();

            this.genes.push(new Gene());        

        }

    }

}

export default Individual;