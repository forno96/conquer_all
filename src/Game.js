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

function IsVictory() {
    return false;
}

function PutArmy(G, ctx, stateKey, contKey, currentPlayer) {
    let state = G.MapState[contKey]["states"][stateKey];
    if (currentPlayer.id != state.playerID){
        return INVALID_MOVE;
    }
    else {
        state.army += 1;
    }
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
                id: "0",
                armies: 10,
                hslColor: 265
            },
            "1":{
                id: "1",
                armies: 10,
                hslColor: 199
            },
            "2":{
                id: "2",
                armies: 10,
                hslColor: 1
            },
            "3":{
                id: "3",
                armies: 10,
                hslColor: 118
            },
            "4":{
                id: "4",
                armies: 10,
                hslColor: 61
            },
            "5":{
                id: "5",
                armies: 10,
                hslColor: 293
            },
            "6":{
                id: "6",
                armies: 10,
                hslColor: 165
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
            },
            light: {
                S: 78,
                L: 90
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