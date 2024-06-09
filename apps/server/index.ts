const PORT = process.env.PORT || 8080;
import {createServer} from 'http';
import { Server } from 'socket.io';
import { setupListener } from './services/setupListeners';

const httpServer = createServer();
const io = new Server(httpServer,{
    cors:{
        origin:"*",
        methods:["GET","POST"]

    }
})
setupListener(io);
httpServer.listen(PORT,()=>console.log(`server is running on port ${PORT}`))