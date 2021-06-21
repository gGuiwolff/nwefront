import { useEffect } from "react";
import NavBar from "./NavBar";
import Chat from "./Chat";
import OtherProfile from "./OtherProfile";
import EditProfile from "./EditProfile";
import Friends from "./Friends";
import Message from "./Message";
import UploadFile from "./uploadimage/UploadFile";
import Listfeed from "./Listfeed";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { receiveUser, setLoading, resetError } from "../redux/actions";
import mainTheme from "./ui/mainTheme";
import ListOtherFeed from './ListOtherFeed';
import IndividualPost from './IndividualPost';
import Teste from './Teste';

import { MuiThemeProvider } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector(({ user }) => user);
    const error = useSelector(({ error }) => error);

    useEffect(() => {
        dispatch(receiveUser());
    }, []);

    useEffect(() => {
        dispatch(setLoading(false));
        setTimeout(() => {
            dispatch(resetError());
        }, 3000);
    }, [error]);

    return (
        <MuiThemeProvider theme={mainTheme}>
            <Router>
                {user && <NavBar />}
                {error && (
                    <div>
                        <Alert severity="error">
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    </div>
                )}
                {user && (
                    <>
                        <Route exact path="/" component={Chat} />
                        <Route exact path="/profile" component={EditProfile} />
                        <Route exact path="/feed" component={UploadFile} />
                        <Route exact path="/listfeed" component={Listfeed} />
                        <Route exact path="/teste" component={Teste} />
                        <Route
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route
                            path="/listotherfeed/:id"
                            render={(props) => (
                                <ListOtherFeed
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route
                            path="/indiviaualpost/:id"
                            render={(props) => (
                                <IndividualPost
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route
                            path="/friends"
                            render={(props) => <Friends />}
                        />
                        <Route path="/message/:friend_id" component={Message} />
                    </>
                )}
            </Router>
        </MuiThemeProvider>
    );
};

export default App;
