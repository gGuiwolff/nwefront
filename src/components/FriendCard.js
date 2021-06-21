import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import MailIcon from "@material-ui/icons/Mail";
import Typography from "@material-ui/core/Typography";
import FriendAvatar from "./FriendAvatar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { acceptFriend, unfriend } from "../redux/actions";

const useStyles = makeStyles({
    root: {
        width: "10vw",
        minWidth: 150,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
        fontSize: 14,
        textAlign: "center",
    },
    link: {
        textDecoration: "none",
        color: "black",
    },
    actions: {
        display: "flex",
        flexDirection: "column",
    },
});

const FriendCard = ({ id, first_name, last_name, picture, buttonText }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleClick = ({ target }) => {
        const operation = target.innerText.toLowerCase();
        operation === "accept" && dispatch(acceptFriend(id));
        operation === "unfriend" && dispatch(unfriend(id));
    };
    return (
        <Card className={classes.root}>
            <Link to={`/user/${id}`} className={classes.link}>
                <CardContent className={classes.content}>
                    <FriendAvatar
                        first={first_name}
                        last={last_name}
                        picture={picture}
                    />
                    <Typography
                        variant="h5"
                        component="h2"
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                    >
                        {first_name} {last_name}
                    </Typography>
                </CardContent>
            </Link>
            <CardActions className={classes.actions}>
                {buttonText === "Unfriend" && (
                    <Link to={`/message/${id}`}>
                        <Button startIcon={<MailIcon />}>Message</Button>
                    </Link>
                )}
                <Button onClick={handleClick} size="small">
                    {buttonText}
                </Button>
            </CardActions>
        </Card>
    );
};

export default FriendCard;
