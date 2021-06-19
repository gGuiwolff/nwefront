import axios from "../axios";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Box } from "@material-ui/core/";
import ChatMessage from "./ChatMessage";
import { setError, addContact, receiveThreads } from "../redux/actions";

const useStyles = makeStyles({
    messages: {
        overflow: "scroll",
    },
    inputBox: {
        padding: "2rem",
    },
});

const Message = () => {
    const classes = useStyles();
    const elemRef = useRef();
    const params = useParams();
    const { friend_id } = params;
    const dispatch = useDispatch();
    const messages = useSelector(
        ({ privateMessages }) => privateMessages[friend_id]
    );
    const friend = useSelector(({ contacts }) => contacts[friend_id]);
    const user = useSelector(({ user }) => user);
    const threads = useSelector(({ threads }) => threads);

    const checkKey = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("newPmMessage", e.target.value, friend_id);
            e.target.value = "";
        }
    };
    useEffect(() => {
        !messages && socket.emit("getPms", params);
        !friend &&
            (async () => {
                try {
                    const { data } = await axios.get(`/user/${friend_id}.json`);
                    const { user } = data;
                    user.id = friend_id;
                    if (data.ownProfile) {
                        history.push("/profile");
                        return;
                    }
                    dispatch(addContact(user));
                } catch (err) {
                    const { error } = err.response.data;
                    dispatch(setError(error));
                    history.push("/");
                }
            })();
        !threads && dispatch(receiveThreads());
    }, []);

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [messages]);

    return (
        <>
            <Box className={classes.messages} ref={elemRef}>
                {messages &&
                    friend &&
                    user &&
                    messages.map((message) => (
                        <ChatMessage
                            key={message.id}
                            id={message.id}
                            first_name={
                                message.sender_id == friend_id
                                    ? friend.first_name
                                    : "You"
                            }
                            last_name={
                                message.sender_id == friend_id
                                    ? friend.last_name
                                    : ""
                            }
                            picture={
                                message.sender_id == friend_id
                                    ? friend.profile_picture
                                    : user.profile_picture
                            }
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

export default Message;
