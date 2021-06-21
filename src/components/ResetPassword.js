import { Link } from "react-router-dom";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import Login from "./Login";
import mainGridStyles from "./ui/mainGridStyles";
import { withStyles } from "@material-ui/core/styles";
import useAuthSubmit from "../hooks/useAuthSubmit";
import useForm from "../hooks/useForm";

const ResetPassword = ({ classes }) => {
    const [values, handleChange] = useForm();
    const [submit, progress] = useAuthSubmit(
        "/password/reset/start",
        values,
        true,
        "/password/reset/verify"
    );
    return (
        <>
            {progress.step == 1 && (
                <>
                    {progress.error && (
                        <div>
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                <strong>{progress.errorMessage}</strong>
                            </Alert>
                        </div>
                    )}
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Reset yout Password
                        </Typography>
                        <Typography variant="body1">
                            Pleaser enter your email address
                        </Typography>
                        <Typography variant="subtitle1">
                            We will send you a code to reset your password!
                        </Typography>

                        <form className={classes.form} onSubmit={submit}>
                            <TextField
                                type="email"
                                name="email"
                                label="E-Mail"
                                onChange={handleChange}
                                inputProps={{
                                    minLength: 6,
                                    maxLength: 255,
                                }}
                                autoFocus
                                fullWidth
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
                                Submit
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="/">
                                        <Button>Create new account</Button>
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
            )}
            {progress.step == 2 && (
                <>
                    {progress.error && (
                        <div>
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                <strong>{progress.errorMessage}</strong>
                            </Alert>
                        </div>
                    )}
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h4">
                            Reset your password
                        </Typography>
                        <Typography variant="body2">
                            Please enter the code from the email and your new
                            password!
                        </Typography>

                        <form className={classes.form} onSubmit={submit}>
                            <TextField
                                type="text"
                                name="code"
                                label="Code"
                                onChange={(e) => handleChange(e)}
                                inputProps={{
                                    minLength: 6,
                                    maxLength: 6,
                                }}
                                autoFocus
                                fullWidth
                                required
                            />
                            <TextField
                                type="password"
                                name="password"
                                label="New Password"
                                onChange={(e) => handleChange(e)}
                                inputProps={{
                                    minLength: 7,
                                    maxLength: 255,
                                }}
                                autoFocus
                                fullWidth
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
                                Submit
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="/">
                                        <Button>Create new account</Button>
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
            )}
            {progress.step == 3 && (
                <>
                    <Alert severity="success">
                        Your password was changed successfully!
                    </Alert>
                    <Login />
                </>
            )}
        </>
    );
};

export default withStyles(mainGridStyles)(ResetPassword);
