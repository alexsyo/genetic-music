'use strict';

import Individual from './Individual.js';
import Gene from './Gene.js';

class Population {

    constructor(props) {

        this.individuals = [];
        this.limit = 4;
        this.mutation = 1;
        this.init = this.init.bind(this);
        this.reproduce = this.reproduce.bind(this);
        this.reproduceIndividual = this.reproduceIndividual.bind(this);
        this.pickGene = this.pickGene.bind(this);

    }

    init() {

        for(let i = 0; i < this.limit; i++) {

            let individual = new Individual();
            individual.init();

            this.individuals.push(individual);

        }

    }

    reproduce() {

        let newIndividuals = [];

        for(let i = 0; i < this.limit; i++) {

            let newIndividual = this.reproduceIndividual();

            newIndividuals.push(newIndividual);

        }

        this.individuals = newIndividuals;

    }

    reproduceIndividual() {

        let newIndividual = new Individual();

        for(let e = 0; e < newIndividual.limit; e++) {

            let gene = this.pickGene(e, newIndividual.limit);

            newIndividual.genes.push(gene);

        }

        return newIndividual;

    }

    pickGene(genePosition, genesSize) {

        if(Math.floor(Math.random() * 100) <= this.mutation) {

            return new Gene();

        }

        while(true) {

            let randIndex = Math.floor(Math.random() * this.individuals.length);
            let randSelector = Math.floor(Math.random() * 10);

            if (randSelector <= this.individuals[randIndex].fitness) {

                return this.individuals[randIndex].genes[genePosition];

            }
            
        }

    }

}

export default Population;