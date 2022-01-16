import { INVALID_MOVE } from 'boardgame.io/core';
import { Contintents } from "./Map";

var MapState = {};
for (let continent in Contintents){
    MapState[continent] = {
        "states": []
    };
    
    Contintents[continent]["states"].forEach((state) => {
        MapState[continent]["states"].push({
            "country": state.country,
            "army": 1,
            "playerID": null
        });
    });
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