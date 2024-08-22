

// whenever a new connection is set up we can join the New User to the new room

import { Socket } from "socket.io";
import { v4 as uuID } from "uuid";

const roomHandler = (socket: Socket) => {

    const roomID = uuID();
    const createRoom = () => {
        socket.join(roomID);
        socket.emit("room-created" , {roomID});
        console.log("Room Created" , roomID);
        
    }


    const joinRoom = ({roomId} : {roomId: string}) => {
        console.log("New user has joined room ", roomId);
        
    }


    // Listening to the events from the events emitted by the Websocket server
    socket.on("create-room", createRoom);
    socket.on("joined-room", joinRoom);
}



export default roomHandler;