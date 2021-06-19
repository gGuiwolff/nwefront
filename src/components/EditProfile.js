import {
    Paper,
    Grid,
    Typography,
    CssBaseline,
    Button,
} from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import mainGridStyles from "./ui/mainGridStyles";
import Uploader from "./Uploader";
import EditBio from "./EditBio";
import Profile from "./Profile";
import { useState } from "react";
import { useSelector } from "react-redux";

const EditProfile = ({ classes }) => {
    const user = useSelector(({ user }) => user);
    const { first_name, last_name, profile_picture, bio } = user;
    const loading = useSelector(({ loading }) => loading);
    const [showBioEditor, setShowBioEditor] = useState(false);
    const toggleBioEdit = () => {
        setShowBioEditor((prevState) => !prevState);
    };

    return (
        <>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid
                    item
                    xs={12}
                    sm={7}
                    md={6}
                    style={{
                        display: "flex !important",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Profile
                        classes={classes}
                        first_name={first_name}
                        last_name={last_name}
                        bio={bio}
                        profile_picture={profile_picture}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={5}
                    md={6}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <>
                        <Typography
                            component="h1"
                            variant="h5"
                            style={{ marginTop: "1rem" }}
                        >
                            Edit your Profile
                        </Typography>
                        <Uploader classes={classes} />
                        {showBioEditor ? (
                            <EditBio
                                classes={classes}
                                toggleBioEdit={toggleBioEdit}
                                handleBioInput={(e) => handleBioInput(e)}
                            />
                        ) : (
                            <div className={classes.paperEdit}>
                                <Button
                                    disabled={loading}
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={toggleBioEdit}
                                >
                                    {bio ? "Edit Bio" : "Add Bio"}
                                </Button>
                            </div>
                        )}
                    </>
                </Grid>
            </Grid>
        </>
    );
};
export default withStyles(mainGridStyles)(EditProfile);
