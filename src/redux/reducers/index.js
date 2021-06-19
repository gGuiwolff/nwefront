import { friends } from "./friends";
import { user } from "./user";
import { error } from "./error";
import { loading } from "./loading";
import { chat } from "./chat";
import { threads } from "./threads";
import { contacts } from "./contacts";
import { privateMessages } from "./privateMessages";
import { combineReducers } from "redux";

const reducers = combineReducers({
    user,
    friends,
    contacts,
    chat,
    privateMessages,
    threads,
    loading,
    error,
});

export default reducers;
