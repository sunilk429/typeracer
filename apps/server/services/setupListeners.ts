import { Server } from "socket.io";
import { Game } from '../Game/Game';
import { randomUUID } from "crypto";
import { v4 as uuidv4 } from 'uuid';
export function setupListener(io: Server) {
    const game = new Game();
    io.on('connection', (socket) => {
        console.log(`New Connection: ${socket.id} `)
        const playerId = socket.id;
        const canJoin = game.addPlayer(playerId);
        if (!canJoin) {
            socket.emit('gameInProgress');
            return;
        }
        else {
            socket.emit('welcome', { playerId });

            const leaderBoard = game.getLeaderBoard();
            io.emit('leaderBoardUpdate', leaderBoard);

            socket.on('startRace', () => {
                if (game.startRace(playerId)) {
                    io.emit('raceStarted');
                }
            })
            socket.on('disconnect', () => {
                game.removePlayer(playerId);
                io.emit('playerLeft', playerId)
                const leaderBoard = game.getLeaderBoard();
                io.emit('leaderBoardUpdate', leaderBoard);
            })

        }
        socket.on('startRace', (playerId) => {
            if (game.startRace(playerId)) {
                io.emit('raceStarted');
            }
        })
    })
}