import { INVALID_MOVE } from 'boardgame.io/core';
import { Contintents } from "./Map";

var MapState = {};
for (let contKey in Contintents){
    MapState[contKey] = {
        "states": {}
    };
    
    for (let stateKey in Contintents[contKey]["states"]){
        let state = Contintents[contKey][stateKey];
        MapState[contKey]["states"][stateKey] = {
            country: stateKey,
            continent: contKey,
            army: 1,
            playerID: null
        };
    }
}

function incrementArmy(G, ctx, stateKey, contKey) {
    G.MapState[contKey]["states"][stateKey].army += 1
}

function IsVictory() {
    return false;
}

function PutArmy(G, ctx) {

}

function PlayCard(G, ctx) {
    
}

export const Conquer = {
    setup: () => ({ 
        MapState: MapState,
        Player: {
            "0":{
                armies: 10
            },
            "1":{
                armies: 10
            }
        }
    }),

    turn: {},

    phases: {
        placeArmies: {
            moves: { PutArmy },
            endIf: G => (G.deck <= 0),
            turn: { minMoves: 1, maxMoves: 1 },
            start: true,
            next: 'play',
        },

        play: {
            moves: { PlayCard },
        },
    },

    endIf: (G, ctx) => {
        if (IsVictory()) {
            return { winner: ctx.currentPlayer };
        }
    },
    
};