import React from 'react';
import ReactDOM from 'react-dom';


import Landing from "./components/Landing";
import App from "./components/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { init } from "./socket";

import reducers from "./redux/reducers/";

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
if (location.pathname === "/welcome") {
    elem = <Landing />;
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("#root"));
