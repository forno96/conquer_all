const { Server, Origins } = require('boardgame.io/server');
const { Conquer } = require('./Game');

const server = Server({
    games: [Conquer],
    origins: [Origins.LOCALHOST],
});

server.run(8000);
