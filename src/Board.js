import React from 'react';
import { Contintents, Lines } from "./Map";

export class ConquerBoard extends React.Component {

    onClick(state) {
        console.log("Player click " + state.country);
        this.props.moves.PutArmy(state.country);
    }
    onMouseOver(state){
        document.getElementById(state.country).style.fill = "#FFFFFF";
        // document.getElementById("countyLabel").textContent = state.country;
        
        // document.getElementById("countryConnections").textContent = Array.from(state.connections).join(', ');
        state.connections.forEach((connection)=>{
            document.getElementById(connection).style.fill = "#7a7a7a";
        })
    }
    onMouseOut(state){
        document.getElementById(state.country).style.fill = ""
        if ("connections" in state) {
            // document.getElementById("countryConnections").textContent = Array.from(state.connections).join(', ');
            state.connections.forEach((connection) => {
                document.getElementById(connection).style.fill = "";
            })
        }
        //document.getElementById("countyLabel").textContent = "";
    }
    
    render() {
        let conts = [];
        let armies = [];
        for (let cont in Contintents) {
            let tmp = [];
            Contintents[cont].states.forEach((state, i) => {
                tmp.push(
                    <path className='country' id={state.country} d={state.geometry} onClick={() => this.onClick(state)} onMouseOver={() => this.onMouseOver(state)} onMouseOut={() => this.onMouseOut(state)} />
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
                        onClick={() => this.onClick(state)}
                        onMouseOver={() => this.onMouseOver(state)}
                        onMouseOut={() => this.onMouseOut(state)}>

                        { this.props.G.MapState[cont].states[i].army }

                    </text>
                );
            });
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
            let el = null;
            if (i == this.props.ctx.playOrderPos) {
                el = <span className="tag is-large is-info" id={"player_turn_" + i}>{i}</span>
            }
            else {
                el = <span className="tag is-large is-info is-light" id={"player_turn_" + i}>{i}</span>
            }
            playComponent.push(el);
        }

        let message = "";
        if (this.props.ctx.phase == "placeArmies"){
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

