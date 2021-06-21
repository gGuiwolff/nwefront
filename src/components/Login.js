import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Link } from "react-router-dom";
import mainGridStyles from "./ui/mainGridStyles";
import { withStyles } from "@material-ui/core/styles";
import useAuthSubmit from "../hooks/useAuthSubmit";
import useForm from "../hooks/useForm";

const Login = ({ classes }) => {
    const [values, handleChange] = useForm();
    const [submit, progress] = useAuthSubmit("/login", values);

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
                    Login
                </Typography>

                <form className={classes.form} onSubmit={submit}>
                    <TextField
                        type="email"
                        name="email"
                        label="Email"
                        onChange={handleChange}
                        inputProps={{ minLength: 6, maxLength: 255 }}
                        autoFocus
                        fullWidth
                        required
                    />
                    <TextField
                        type="password"
                        name="password"
                        label="Password"
                        onChange={handleChange}
                        inputProps={{ minLength: 7 }}
                        autoFocus
                        fullWidth
                        required
                    />
                    <Button
                        disabled={progress.isSubmitting}
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        LOGIN
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/resetPassword">
                                <Button>Forgot your password?</Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/">
                                <Button>Create new account</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </>
    );
};

export default withStyles(mainGridStyles)(Login);
