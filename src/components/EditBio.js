import { useState, useEffect, useRef } from "react";
import { Button, TextField } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import { changeBio, setLoading } from "../redux/actions";

const EditBio = ({ classes, toggleBioEdit }) => {
    const dispatch = useDispatch();
    const [draft, setDraft] = useState("");
    const loading = useSelector(({ loading }) => loading);
    const bio = useSelector(({ user }) => user.bio);

    const handleBioInput = (e) => {
        setDraft(e.target.value);
    };

    const handleBioSubmit = async (e) => {
        if (bio === draft) {
            return toggleBioEdit();
        }
        dispatch(setLoading(true));
        dispatch(changeBio(e, draft));
    };

    const didMount = useRef(false);
    useEffect(() => {
        dispatch(setLoading(false));
        setDraft(bio);
        didMount.current ? toggleBioEdit() : (didMount.current = true);
    }, [bio]);

    return (
        <div className={classes.paperEdit}>
            <form className={classes.form} onSubmit={handleBioSubmit}>
                <TextField
                    onChange={handleBioInput}
                    type="text"
                    name="bio"
                    label="Bio"
                    inputProps={{ maxLength: 500 }}
                    multiline
                    rows={4}
                    autoFocus
                    fullWidth
                    defaultValue={bio}
                />
                <Button
                    disabled={loading}
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Save Bio
                </Button>
            </form>
        </div>
    );
};

export default EditBio;
