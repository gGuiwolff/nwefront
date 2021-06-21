import { Button } from "@material-ui/core/";
import { useState, useEffect } from "react";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { setError } from "../redux/actions";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";

const FriendButton = ({ id, user }) => {
    const dispatch = useDispatch();
    const [buttonText, setButtonText] = useState("");
    const statuses = [
        "Add Friend",
        "Unfriend",
        "Cancel Friend Request",
        "Accept Friend Request",
    ];

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/friend/${id}`);
                const { status } = data;
                setButtonText(statuses[status]);
            } catch (err) {
                const { error } = err.response.data;
                dispatch(setError(error));
            }
        })();
    }, []);

    const handleClick = async () => {
        try {
            const { data } = await axios.post("/friend", {
                operation: buttonText,
                otherUserId: id,
            });
            const { status } = data;
            status !== 4
                ? setButtonText(statuses[status])
                : window.location.reload();
        } catch (err) {
            const { error } = err.response.data;
            setError(error);
        }
    };

    return (
        <>
            {buttonText === "Unfriend" && (
                <Link to={`/message/${id}`}>
                    <Button
                        variant="outlined"
                        color="primary"
                        style={{ margin: "0.5rem 0rem" }}
                        startIcon={<MailIcon />}
                    >
                        Send Message
                    </Button>
                </Link>
            )}
            <Button
                onClick={handleClick}
                style={{ margin: "0.5rem 0rem" }}
                variant="contained"
                size="small"
                color="primary"
            >
                {buttonText}
            </Button>
        </>
    );
};

export default FriendButton;
