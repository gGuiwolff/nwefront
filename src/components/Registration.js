import axios from "../axios";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Link } from "react-router-dom";
import mainGridStyles from "./ui/mainGridStyles";
import { withStyles } from "@material-ui/core/styles";
import useAuthSubmit from "../hooks/useAuthSubmit";
import useForm from "../hooks/useForm";

const Registration = ({ classes }) => {
    console.log('[EXPO REGISTRANDO]')
    const [values, handleChange] = useForm();
    const [submit, progress] = useAuthSubmit("/register", values);

    return (
        <>
            {progress.error && (
                <div>
                    <Alert severity="error">
                        <AlertTitle>{progress.errorMessage}</AlertTitle>
                    </Alert>
                </div>
            )}
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Register now
                </Typography>
                <form className={classes.form} onSubmit={submit}>
                    <TextField
                        type="text"
                        name="firstName"
                        label="First Name"
                        onChange={handleChange}
                        inputProps={{ minLength: 2, maxLength: 50 }}
                        fullWidth
                        autoFocus
                        required
                    />
                    <TextField
                        type="text"
                        name="lastName"
                        label="Last Name"
                        onChange={handleChange}
                        inputProps={{ minLength: 2, maxLength: 50 }}
                        fullWidth
                        autoFocus
                        required
                    />
                    <TextField
                        type="email"
                        name="email"
                        label="E-Mail"
                        onChange={handleChange}
                        inputProps={{ minLength: 6, maxLength: 255 }}
                        fullWidth
                        autoFocus
                        required
                    />
                    <TextField
                        type="password"
                        name="password"
                        label="Password"
                        onChange={handleChange}
                        inputProps={{ minLength: 7, maxLength: 255 }}
                        fullWidth
                        autoFocus
                        required
                    />
                    <Button
                        disabled={progress.isSubmitting}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.submit}
                    >
                        REGISTER NOW
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/resetPassword">
                                <Button>Forgot your password?</Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/login">
                                <Button>Log in</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </>
    );
};

export default withStyles(mainGridStyles)(Registration);
