import React from 'react';
import { Contintents, Lines } from './Map';

export class ConquerBoard extends React.Component {
    onClick(id) {
        console.log(id);
        //this.props.moves.clickCell(id);
    }
    onMouseOver(id){
        document.getElementById(id).style.fill = "#FFFFFF";
        document.getElementById("countyLabel").textContent = id;
    }
    onMouseOut(id){
        document.getElementById(id).style.fill = ""
        //document.getElementById("countyLabel").textContent = "";
    }
    
    render() {
        let conts = [];
        for (let cont in Contintents) {
            let tmp = [];
            Contintents[cont].states.forEach(state => {
                tmp.push(
                    <path className='country' id={state.country} d={state.geometry} onClick={() => this.onClick(state.country)} onMouseOver={() => this.onMouseOver(state.country)} onMouseOut={() => this.onMouseOut(state.country)}  />
                );
            });
            conts.push(
                <g id={cont} stroke={Contintents[cont].stroke} fill="#E5E5E5">
                    {tmp}
                </g>
            );
        }

        console.log(Lines)
        let conntectedLines = [];
        Lines.forEach((line)=>{
            //console.log(line)
            conntectedLines.push(
                <line stroke="#000000" strokeDasharray="6,6" x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}/>
            );
        })

        return (
            <div className="container is-fullhd">
                <p className="is-size-4">Player ID: <span className="has-text-info has-text-weight-bold">{this.props.playerID}</span></p>
                <p>State: <span id="countyLabel" className="has-text-info"></span></p>
                <div className="columns">
                    <div className="column is-8">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1050 670">
                            <g id="map" visibility="visible" fill="none" strokeWidth="2.5">
                                {conntectedLines}
                                {conts}
                            </g>
                        </svg>
                    </div>
                    <div className="column">Controls</div>
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

