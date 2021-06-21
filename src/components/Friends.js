import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { receiveFriends } from "../redux/actions";
import { Typography, Container, Box } from "@material-ui/core";
import FriendCard from "./FriendCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    main: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    section: {
        display: "flex",
        flexDirection: "column",
        height: "50%",
        alignItems: "center",
    },
    contacts: {
        display: "flex",
        alignItems: "space-evenly",
        justifyContent: "start",
        width: "100%",
        overflowX: "auto",
    },
    title: {
        margin: "1rem 0rem",
        textAlign: "center",
    },
});

const Friends = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const friends = useSelector(
        ({ friends }) => friends && friends.filter((friend) => friend.accepted)
    );
    const requests = useSelector(
        ({ friends }) => friends && friends.filter((friend) => !friend.accepted)
    );
    useEffect(() => {
        dispatch(receiveFriends());
    }, []);

    return !friends ? null : (
        <Container className={classes.main}>
            {friends && friends.length > 0 && (
                <Box className={classes.section}>
                    <Typography
                        className={classes.title}
                        component="h2"
                        variant="h6"
                        color="primary"
                    >
                        Friends
                    </Typography>
                    <Box className={classes.contacts}>
                        {friends.map((friend) => (
                            <FriendCard
                                key={friend.id}
                                id={friend.id}
                                first_name={friend.first_name}
                                last_name={friend.last_name}
                                picture={friend.profile_picture}
                                buttonText={"Unfriend"}
                            />
                        ))}
                    </Box>
                </Box>
            )}
            {requests && requests.length > 0 && (
                <Box className={classes.section}>
                    <Typography
                        className={classes.title}
                        component="h1"
                        variant="h5"
                    >
                        Requests
                    </Typography>
                    <Box className={classes.contacts}>
                        {requests.map((requester) => (
                            <FriendCard
                                key={requester.id}
                                id={requester.id}
                                first_name={requester.first_name}
                                last_name={requester.last_name}
                                picture={requester.profile_picture}
                                buttonText={"Accept"}
                            />
                        ))}
                    </Box>
                </Box>
            )}
            {requests &&
                requests.length == 0 &&
                friends &&
                friends.length == 0 && (
                    <>
                        <Typography
                            className={classes.title}
                            component="h2"
                            variant="h6"
                            color="primary"
                        >
                            You don't have any friends yet
                        </Typography>
                    </>
                )}
        </Container>
    );
};

export default Friends;
