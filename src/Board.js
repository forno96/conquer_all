import React from 'react';
import { Contintents, Lines } from "./Map";

export class ConquerBoard extends React.Component {

    onClick(state) {
        console.log(state.country);
        //this.props.moves.clickCell(id);
    }
    onMouseOver(state){
        document.getElementById(state.country).style.fill = "#FFFFFF";
        document.getElementById("countyLabel").textContent = state.country;
        
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
            Contintents[cont].states.forEach(state => {
                tmp.push(
                    <path className='country' id={state.country} d={state.geometry} onClick={() => this.onClick(state)} onMouseOver={() => this.onMouseOver(state)} onMouseOut={() => this.onMouseOut(state)} />
                );
                if ("army_pos" in state) {
                    armies.push(
                        <text 
                            id={state.country + "_label"}
                            x={state.army_pos.x} y={state.army_pos.y}
                            style={{
                                "font-size": "1.5em",
                                "fill": "#000000",
                                "user-select": "none",
                                "font-family": "PT Mono",
                                "paint-order": "stroke",
                                "stroke": "#fbfbfb",
                                "stroke-width": "5px",
                                "stroke-linecap": "butt",
                                "stroke-linejoin": "miter"
                            }} onClick={() => this.onClick(state)} onMouseOver={() => this.onMouseOver(state)} onMouseOut={() => this.onMouseOut(state)}>0</text>
                    );
                }
                else {
                    console.log(state);
                }
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

        return (
            <div className="container is-fullhd">
                <div className="columns">
                    <div className="column">
                        <p className="is-size-4">Player ID: <span className="has-text-info has-text-weight-bold">{this.props.playerID}</span></p>
                        <p>State: <span id="countyLabel" className="has-text-info"></span></p>
                        <div id="countryConnections"></div>
                    </div>
                    <div className="column">
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
                            Controls
                        </div>
                    </div>
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

