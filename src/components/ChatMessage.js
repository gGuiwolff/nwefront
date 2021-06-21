import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FriendAvatar from "./FriendAvatar";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        marginTop: 2,
        fontSize: 15,
    },
    link: {
        textDecoration: "none",
        color: "black",
    },
    message: {
        flex: 1,
    },
});

const ChatMessage = ({
    id,
    first_name,
    last_name,
    message,
    created_at,
    user_id,
    picture,
}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Link to={`/user/${user_id}`} className={classes.link}>
                <CardContent className={classes.content}>
                    <FriendAvatar
                        first={first_name}
                        last={last_name}
                        picture={picture}
                    />
                </CardContent>
            </Link>
            <CardContent className={classes.message}>
                <Typography
                    variant="h5"
                    component="h2"
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                >
                    {first_name} {last_name}, {created_at}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {message}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ChatMessage;
