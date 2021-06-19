import { useEffect } from "react";
import { Button } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import { changeProfilePic, setLoading } from "../redux/actions";

const Uploader = ({ classes }) => {
    const dispatch = useDispatch();
    const loading = useSelector(({ loading }) => loading);
    const profilePicture = useSelector(({ user }) => user.profile_picture);

    const handleUpload = async (e) => {
        dispatch(setLoading(true));
        dispatch(changeProfilePic(e));
    };

    useEffect(() => {
        dispatch(setLoading(false));
    }, [profilePicture]);

    return (
        <div className={classes.paperEdit}>
            <form className={classes.form}>
                <input
                    onChange={(e) => handleUpload(e)}
                    accept="image/*"
                    className={classes.input}
                    style={{ display: "none" }}
                    id="file-upload"
                    type="file"
                />
                <label htmlFor="file-upload">
                    <Button
                        disabled={loading}
                        fullWidth
                        color="primary"
                        variant="contained"
                        component="span"
                        type="submit"
                        className={classes.submit}
                    >
                        Change profile picture
                    </Button>
                </label>
            </form>
        </div>
    );
};

export default Uploader;
