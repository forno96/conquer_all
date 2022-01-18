import React from 'react';
import { Contintents, Lines } from "./Map";

export class ConquerBoard extends React.Component {

    getHSL(H, mode="normal") {
        let S = this.props.G.HSL[mode].S;
        let L = this.props.G.HSL[mode].L;
        let ret = "hsl(" + H + ", " + S + "%, " + L + "%)";
        return ret;
    }
    getState(continentKey, stateKey){
        return this.props.G.MapState[continentKey].states[stateKey]
    }

    onClick(state, currentPlayer) {
        console.log("Player click " + state.country);
        this.props.moves.PutArmy(state.country, state.continent, currentPlayer);
    }
    onMouseOver(state, player) {
        document.getElementById(state.country).style.fill = this.getHSL(player.hslColor, "highlight");
        
        state.connections.forEach((connection)=>{
            document.getElementById(connection.stateKey).style.fill = this.getHSL(
                this.props.G.Players[this.getState(connection.contKey, connection.stateKey).playerID].hslColor,
                "light"
            );
        })
    }
    onMouseOut(state, player) {
        document.getElementById(state.country).style.fill = this.getHSL(player.hslColor);
        
        if ("connections" in state) {
            state.connections.forEach((connection) => {
                document.getElementById(connection.stateKey).style.fill = this.getHSL(
                    this.props.G.Players[this.getState(connection.contKey, connection.stateKey).playerID].hslColor
                )
            })
        }        
    }
    
    render() {
        let conts = [];
        let armies = [];
        for (let cont in Contintents) {
            let tmp = [];
            for (let stateKey in Contintents[cont].states){
                let state = Contintents[cont].states[stateKey];
                let player = this.props.G.Players[this.props.G.MapState[cont].states[stateKey].playerID];
                let currentPlayer = this.props.G.Players[this.props.ctx.currentPlayer];
                tmp.push(
                    <path
                        className='country'
                        id={stateKey}
                        d={state.geometry}
                        style={{
                            "fill": this.getHSL(player.hslColor)
                        }}
                        onClick={() => this.onClick(state, currentPlayer)}
                        onMouseOver={() => this.onMouseOver(state, player)}
                        onMouseOut={() => this.onMouseOut(state, player)}
                    />
                );
                armies.push(
                    <text 
                        id={state.country + "_label"}
                        x={state.army_pos.x} y={state.army_pos.y}
                        style={{
                            "fontSize": "1.5em",
                            "fill": "#000000",
                            "userSelect": "none",
                            "fontFamily": "PT Mono",
                            "paintOrder": "stroke",
                            "stroke": "#fbfbfb",
                            "strokeWidth": "5px",
                            "strokeLinecap": "butt",
                            "strokeLinejoin": "miter"
                        }}
                        onClick={() => this.onClick(state, currentPlayer)}
                        onMouseOver={() => this.onMouseOver(state, player)}
                        onMouseOut={() => this.onMouseOut(state, player)}>

                        { this.props.G.MapState[cont].states[stateKey].army }

                    </text>
                );
            };
            conts.push(
                <g id={cont} stroke={Contintents[cont].stroke} fill="#E5E5E5">
                    {tmp}
                </g>
            );
        }

        //console.log(Lines)
        let conntectedLines = [];
        Lines.forEach((line)=>{
            //console.log(line)
            conntectedLines.push(
                <line stroke="#000000" strokeDasharray="6,6" x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}/>
            );
        })
        
        let playComponent = [];
        for (let i in this.props.ctx.playOrder){
            let player = this.props.G.Players[this.props.ctx.playOrder[i]];
            let el = null;
            if (i == this.props.ctx.playOrderPos) {
                el = <span
                    className="tag is-large"
                    id={"player_turn_" + i}
                    style={{
                        backgroundColor: this.getHSL(player.hslColor, "highlight"),
                        color: this.getHSL(player.hslColor, "light")
                    }}
                    >{i}</span>
            }
            else {
                el = <span
                    className="tag is-large"
                    id={"player_turn_" + i}
                    style={{
                        backgroundColor: this.getHSL(player.hslColor, "light"),
                        color: this.getHSL(player.hslColor, "highlight")
                    }}
                    >{i}</span>
            }
            playComponent.push(el);
        }

        let message = "";
        if (this.props.ctx.phase === "placeArmies"){
            if (this.props.ctx.playOrderPos == this.props.playerID) {
                message = "Put one army on one of your country"
            }
            else {
                message = "Wait for your turn for place army"
            }
        }

        return (
            <div className="container is-fullhd mt-1">
                <div className="columns mb-0">
                    <div className="column is-unselectable">
                        {playComponent }
                    </div>
                    <div className="column is-narrow">
                        <p className="is-size-4">Player ID: <span className="has-text-info has-text-weight-bold">{this.props.playerID}</span></p>
                        <div id="countryConnections"></div>
                    </div>
                    <div className="column is-narrow">
                        <p className="is-size-4">Game session: <span className="has-text-info has-text-weight-bold">{this.props.matchID}</span></p>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-9">
                        <div className="box">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1035 660">
                                <g id="map" visibility="visible" fill="none" strokeWidth="2.5">
                                    {conntectedLines}
                                    {conts}
                                    {armies}
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className="column">
                        <div className="box">
                            <p className="is-size-4">Controls</p>
                            <button className="button is-danger is-fullwidth" onClick={() => this.props.events.endTurn()}>End Turn</button>
                        </div>
                    </div>
                </div>
                <div className="box mb-2">
                    <p className="is-size-5 has-text-justified" id="msg-box">
                        { message }
                    </p>
                </div>
            </div>
        );
    }
}

/*
function getDataFormSVG(){
    let world = {}
    for (let i in document.children[0].children) {
        let countries = document.children[0].children[i];
        let tmp = [];

        for (let j in countries.children) {
            let country = countries.children[j];
            try {
                tmp.push({
                    "country": country.id,
                    "geometry": country.getAttribute("d")
                })
            } catch { }
        }

        world[countries.id] = {
            "states": tmp
        }
    }
}
*/
