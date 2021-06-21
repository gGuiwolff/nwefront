import axios from "../axios";
import Profile from "./Profile";
import { withStyles } from "@material-ui/core/styles";
import mainGridStyles from "./ui/mainGridStyles";
import { Box } from "@material-ui/core/";
import { useEffect } from "react";
import FriendButton from "./FriendButton";
import { useDispatch, useSelector } from "react-redux";
import { setError, addContact } from "../redux/actions";

const OtherProfile = ({ history, match, classes }) => {
    const dispatch = useDispatch();
    const { id } = match.params;
    const user = useSelector(({ contacts }) => contacts[id]);

    useEffect(() => {
        !user &&
            (async () => {
                try {
                    const response = await axios.get(`/user/${id}.json`);
                    const { data } = response;
                    if (data.ownProfile) {
                        history.push("/profile");
                        return;
                    }
                    const { user } = response.data;
                    user.id = id;
                    dispatch(addContact(user));
                } catch (err) {
                    const { error } = err.response.data;
                    dispatch(setError(error));
                    history.push("/");
                }
            })();
    }, []);

    return (
        <>
            {user && (
                <Box
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Profile
                        classes={classes}
                        first_name={user.first_name}
                        last_name={user.last_name}
                        profile_picture={user.profile_picture}
                        bio={user.bio}
                    />
                    <Box
                        style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <FriendButton
                            user={user}
                            style={{ margin: "0 auto" }}
                            id={id}
                        />
                    </Box>
                </Box>
            )}
        </>
    );
};

export default withStyles(mainGridStyles)(OtherProfile);
