import React from 'react';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer'
import { Conquer } from './Game';
import { ConquerBoard } from './Board';

const ConquerClient = Client({
  game: Conquer,
  board: ConquerBoard,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
});

const App = () => (
  <div>
    <p>Player 0</p>
    <ConquerClient playerID="0" matchID='123'/>
  </div>
);

export default App;