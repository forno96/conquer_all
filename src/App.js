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

document.children[0].style["overflowY"] = "auto";

const App = () => (
  <div>
    <ConquerClient playerID="0" matchID='123'/>
  </div>
);

export default App;