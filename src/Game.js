import { INVALID_MOVE } from 'boardgame.io/core';
import { Contintents } from "./Map";

function setupMapState(ctx) {
    var i = 0;
    var len = ctx.playOrder.length;

    var MapState = {};
    for (let contKey in Contintents){
        MapState[contKey] = {
            "states": {}
        };
    }

    let states = []
    for (let contKey in Contintents) {
        let stats = Contintents[contKey].states
        var list = Object.keys(stats)
            .map(function (key) {
                return stats[key];
            });
        states = states.concat(list);
    }

    while (states.length) {
        let state = states.splice(states.length * Math.random() | 0, 1)[0];

        MapState[state.continent]["states"][state.country] = {
            country: state.country,
            continent: state.continent,
            army: 1,
            playerID: ctx.playOrder[i % len]
        };
        i += 1;
    }

    return MapState;
}

function incrementArmy(G, ctx, stateKey, contKey) {
    G.MapState[contKey]["states"][stateKey].army += 1;
}

function IsVictory() {
    return false;
}

function PutArmy(G, ctx, stateKey, contKey) {
    incrementArmy(G, ctx, stateKey, contKey)
}

function endPlaceArmies(G) {
    let isFinished = true;
    for (let playerKey in G.Players) {
        let player = G.Players[playerKey];
        if (player.armies !== 0) {
            isFinished = false;
        }
    }
    return isFinished;
}

export const Conquer = {
    setup: (ctx) => ({ 
        MapState: setupMapState(ctx),
        Players: {
            "0":{
                armies: 10,
                hslColor: 265
            },
            "1":{
                armies: 10,
                hslColor: 199
            }
        },
        HSL: {
            normal: {
                S: 78,
                L: 83
            },
            highlight: {
                S: 78,
                L: 59
            }
        }
    }),

    turn: {},

    phases: {
        placeArmies: {
            moves: { PutArmy },
            endIf: G => ( endPlaceArmies(G) ),
            turn: { minMoves: 1, maxMoves: 1 },
            start: true,
            next: 'play',
        },

        play: {
            moves: {  },
        },
    },

    endIf: (G, ctx) => {
        if (IsVictory()) {
            return { winner: ctx.currentPlayer };
        }
    },
    
};