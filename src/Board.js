import React from 'react';
import { ReactComponent as Map } from './static/risk.svg';

export class ConquerBoard extends React.Component {
    onClick(id) {
        this.props.moves.clickCell(id);
    }

    render() {
        let winner = '';
        if (this.props.ctx.gameover) {
            winner =
                this.props.ctx.gameover.winner !== undefined ? (
                    <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
                ) : (
                    <div id="winner">Draw!</div>
                );
        }


        return (
            <div>
                < Map />
                {winner}
            </div>
        );
    }
}
