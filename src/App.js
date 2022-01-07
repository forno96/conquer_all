import React from 'react';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer'
import { TicTacToe } from './Game';
import { TicTacToeBoard } from './Board';

const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
});

const App = () => (
  <div>
    <p>Player 0</p>
    <TicTacToeClient playerID="0" />
    <br/>
    <p>Player 1</p>
    <TicTacToeClient playerID="1" />
    <br/>
    <p>Spect</p>
    <TicTacToeClient playerID="spect" />
  </div>
);

export default App;