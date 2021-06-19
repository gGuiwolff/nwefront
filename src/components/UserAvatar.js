import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
    },
}));

const UserAvatar = () => {
    const user = useSelector(({ user }) => user);
    const { first_name, last_name, profile_picture } = user;
    const classes = useStyles();
    return (
        <Avatar
            alt={`${first_name} ${last_name}`}
            src={
                profile_picture
                    ? profile_picture
                    : "./assets/default_profile_pic.jpg"
            }
            className={classes.small}
        />
    );
};

export default UserAvatar;
