import { useState, Fragment } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
} from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import Badge from "@material-ui/core/Badge";
import FriendAvatar from "./FriendAvatar";
import { useSelector, useDispatch } from "react-redux";
import { receiveThreads, receiveFriends } from "../redux/actions";
import { Link } from "react-router-dom";

const MessagesDrawer = ({ id }) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        left: false,
    });

    const threads = useSelector(({ threads }) => threads);

    const friends = useSelector(
        ({ friends }) => friends && friends.filter((friend) => friend.accepted)
    );

    const toggleDrawer = (anchor, open) => (event) => {
        !threads && dispatch(receiveThreads());
        friends.length < 1 && dispatch(receiveFriends());
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState({ [anchor]: open });
    };

    const list = (anchor) => (
        <div
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {threads &&
                    friends &&
                    Object.values(threads).map((thread, index) => {
                        const friendIds = friends.map((friend) => friend.id);
                        const contactId =
                            thread.sender != id
                                ? thread.sender
                                : thread.recipient;
                        const friendIndex = friendIds.indexOf(contactId);
                        return friendIndex < 0 ? null : (
                            <Link
                                key={index}
                                to={`/message/${contactId}`}
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                }}
                            >
                                <ListItem button>
                                    <ListItemIcon>
                                        <FriendAvatar
                                            first={
                                                friends[friendIndex].first_name
                                            }
                                            last={
                                                friends[friendIndex].last_name
                                            }
                                            picture={
                                                friends[friendIndex]
                                                    .profile_picture
                                            }
                                            small={true}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={thread.message} />
                                </ListItem>
                            </Link>
                        );
                    })}
            </List>
        </div>
    );

    return (
        <div>
            <Fragment>
                <IconButton
                    style={{
                        width: "1em",
                        height: "1em",
                        cursor: "pointer",
                        marginTop: "1.1rem",
                        marginRight: "0.25rem",
                    }}
                    onClick={toggleDrawer("left", true)}
                    aria-label="show 4 new mails"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>

                <SwipeableDrawer
                    anchor={"left"}
                    open={state["left"]}
                    onClose={toggleDrawer("left", false)}
                    onOpen={toggleDrawer("left", true)}
                >
                    {list("left")}
                </SwipeableDrawer>
            </Fragment>
        </div>
    );
};

export default MessagesDrawer;
