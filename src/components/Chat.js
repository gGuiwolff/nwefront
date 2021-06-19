import { useEffect, useRef } from "react";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core/";
import ChatMessage from "./ChatMessage";
import { Box } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";

const useStyles = makeStyles({
    messages: {
        overflow: "scroll",
    },
    inputBox: {
        padding: "2rem",
    },
});

const Chat = () => {
    const classes = useStyles();
    const elemRef = useRef();
    const chatMessages = useSelector(({ chat }) => chat);

    const loading = useSelector(({ loading }) => loading);

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const checkKey = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("newMessage", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <>
            <Box className={classes.messages} ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((message) => (
                        <ChatMessage
                            key={message.id}
                            id={message.id}
                            first_name={message.first_name}
                            last_name={message.last_name}
                            picture={message.profile_picture}
                            message={message.message}
                            created_at={message.created_at}
                            user_id={message.user_id}
                        />
                    ))}
            </Box>
            <>
                <Box className={classes.inputBox}>
                    <TextField
                        type="text"
                        name="chat"
                        label="Chat"
                        inputProps={{ maxLength: 500 }}
                        multiline
                        rows={4}
                        autoFocus
                        fullWidth
                        onKeyDown={checkKey}
                    />
                </Box>
            </>
        </>
    );
};

export default Chat;
