import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    small: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
}));

const FriendAvatar = ({ first, last, picture, small }) => {
    const classes = useStyles();
    return (
        <Avatar
            alt={`${first} ${last}`}
            src={picture ? picture : "./assets/default_profile_pic.jpg"}
            className={!small ? classes.large : classes.small}
        />
    );
};

export default FriendAvatar;
