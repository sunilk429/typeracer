export class Game{
private players:Record<string,{id:string,progress:number}>;
private gameState: 'waiting' | 'raceInProgress';
private leaderBoard: Array<{id:string; progress:number}>;
private host: string | null;

constructor(){
    this.players = {};
    this.gameState = 'waiting';
    this.leaderBoard = [];
    this.host = null;
}
addPlayer(playerId:string):boolean{
    if (this.gameState === 'raceInProgress') {
        return false; // Game is in progress, player cannot join
     }
    
     this.players[playerId] = { id: playerId, progress: 0 };
     if (!this.host) {
        this.host = playerId;
     }
     return true
}
removePlayer(playerId:string):void{
    delete this.players[playerId];
    if(this.host === playerId){
        this.host = Object.keys(this.players)[0] || null;
    }
    if(Object.keys(this.players).length===0){
        this.gameState = 'waiting';
        this.host = null;
    }
}
startRace(playerId:string):boolean{
    if(this.gameState ==='raceInProgress')
        {
            return false;
        }
    if(this.host===playerId && Object.keys(this.players).length>=2){
        this.gameState = 'raceInProgress';
        this.updateLeaderBoard();
        return true;
    }
    return false;
}
updateLeaderBoard():void{
    this.leaderBoard = Object.values(this.players).sort((a,b)=>b.progress-a.progress);
}
updateProgress(playerId:string,progress:number):void{
    if(this.gameState==='raceInProgress'){
        this.players[playerId].progress = progress;
        this.updateLeaderBoard();
    }
}
getLeaderBoard():Array<{id:string; progress:number}>{
    return this.leaderBoard;
}
getGameState():'waiting' | 'raceInProgress'{
    return this.gameState
}

}