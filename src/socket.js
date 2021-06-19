import io from "socket.io-client";
import {
    chatMessages,
    chatMessage,
    pms,
    pm,
    updateThread,
    receiveThreads,
} from "./redux/actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }
    socket.on("addedMessage", (mssg) => store.dispatch(chatMessage(mssg)));
    socket.on("chatMessages", (mssgs) => store.dispatch(chatMessages(mssgs)));
    socket.on("pms", (mssgs) => store.dispatch(pms(mssgs)));
    socket.on("addedPm", (mssg) => {
        store.dispatch(pm(mssg));
        store.dispatch(updateThread(mssg));
    });
    socket.on("receivedPm", (mssg) => {
        store.dispatch(pm(mssg));
    });
};
