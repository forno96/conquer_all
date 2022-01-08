import React from 'react';
import { Contintents } from './Map';

export class ConquerBoard extends React.Component {
    onClick(id) {
        console.log(id);
        //this.props.moves.clickCell(id);
    }
    
    render() {
        let conts = [];
        for (let cont in Contintents) {
            let tmp = [];
            Contintents[cont].states.forEach(state => {
                tmp.push(
                    <path className='country' id={state.country} d={state.geometry} onClick={() => this.onClick(state.country)}  />
                );
            });
            conts.push(
                <g id={cont} stroke={Contintents[cont].stroke} fill="#E5E5E5">
                    {tmp}
                </g>
            );
        }

        return (
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 792">
                    <g id="map" visibility="visible" fill="none" strokeWidth="2.5">
                        {conts}
                    </g>
                </svg>
            </div>
        );
    }
}

