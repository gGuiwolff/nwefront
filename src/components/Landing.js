import { Paper, Grid, CssBaseline } from "@material-ui/core";
import mainGridStyles from "./ui/mainGridStyles";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import mainTheme from "./ui/mainTheme";
import Registration from "./Registration";
import ResetPassword from "./ResetPassword";
import Login from "./Login";

const Landing = ({ classes }) => {
    return (
        <MuiThemeProvider theme={mainTheme}>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    style={{
                        backgroundImage:
                            "url(http://res.cloudinary.com/guiwolff/image/upload/v1622588025/lnamzfaoojflvbx39q7d.svg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)",
                    }}
                    className={classes.image}
                />

                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Router>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route
                                path="/resetPassword"
                                component={ResetPassword}
                            />
                            <Route path="/" component={Registration} />
                        </Switch>
                    </Router>
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
};

export default withStyles(mainGridStyles)(Landing);
