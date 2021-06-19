import axios from "../axios";

export const receiveFriends = async () => {
    try {
        const { data } = await axios.post("/friends");
        const { friends } = data;
        return {
            type: "RECEIVE_FRIENDS",
            friends,
        };
    } catch (err) {
        const { error } = err.response.data;
        return {
            type: "SET_ERROR",
            error,
        };
    }
};

export const acceptFriend = async (id) => {
    try {
        await axios.post("/friend", {
            operation: "Accept Friend Request",
            otherUserId: id,
        });
        return {
            type: "ACCEPT_FRIEND",
            id,
        };
    } catch (err) {
        const { error } = err.response.data;
        return {
            type: "SET_ERROR",
            error,
        };
    }
};

export const unfriend = async (id) => {
    try {
        await axios.post("/friend", {
            operation: "Unfriend",
            otherUserId: id,
        });
        return {
            type: "UNFRIEND",
            id,
        };
    } catch (err) {
        const { error } = err.response.data;
        return {
            type: "SET_ERROR",
            error,
        };
    }
};

export const receiveUser = async (id) => {
    try {
        const { data } = await axios.get("/user");
        const { user } = data;
        if (!user.profile_picture) {
            user.profile_picture = "./assets/default_profile_pic.jpg";
        }
        return {
            type: "RECEIVE_USER",
            user,
        };
    } catch (err) {
        const { error } = err.response.data;
        return {
            type: "SET_ERROR",
            error,
        };
    }
};

export const resetError = () => {
    return {
        type: "RESET_ERROR",
    };
};
export const setError = (error) => {
    return {
        type: "SET_ERROR",
        error,
    };
};

export const changeProfilePic = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    try {
        const { data } = await axios.post("/upload", formData);
        const { image } = data;
        const updated = image.profile_picture;
        return {
            type: "CHANGE_PROFILE_PICTURE",
            updated,
        };
    } catch (err) {
        const { error } = err.response.data;
        return {
            type: "SET_ERROR",
            error,
        };
    }
};
export const changeBio = async (e, updated) => {
    e.preventDefault();
    try {
        await axios.post("/bio", {
            bio: updated,
        });
        return {
            type: "CHANGE_BIO",
            updated,
        };
    } catch (err) {
        const { error } = err.response.data;
        return {
            type: "SET_ERROR",
            error,
        };
    }
};
export const setLoading = (bool) => {
    return {
        type: "SET_LOADING",
        payload: bool,
    };
};

export const chatMessages = (messages) => {
    return {
        type: "ADD_MESSAGES",
        messages,
    };
};
export const chatMessage = (message) => {
    return {
        type: "ADD_MESSAGE",
        message,
    };
};

export const pms = (messages) => {
    return {
        type: "ADD_PRIVATE_MESSAGES",
        messages,
    };
};
export const pm = (message) => {
    return {
        type: "ADD_PRIVATE_MESSAGE",
        message,
    };
};

export const addContact = (contact) => {
    return {
        type: "ADD_CONTACT",
        contact,
    };
};

export const receiveThreads = async () => {
    try {
        const response = await axios.post("/threads");
        const { allMessages } = response.data;
        const { user } = response.data;

        let threads = {};

        for (let message of allMessages) {
            let id;
            id =
                message.sender_id !== user
                    ? message.sender_id.toString()
                    : message.recipient_id.toString();
            !threads[id] &&
                (threads[id] = {
                    recipient: message.recipient_id,
                    sender: message.sender_id,
                    message: message.message,
                    time: message.created_at,
                });
        }
        return {
            type: "RECEIVE_THREADS",
            threads,
        };
    } catch (err) {
        const { error } = err.response.data;
        return {
            type: "SET_ERROR",
            error,
        };
    }
};

export const updateThread = (message) => {
    return {
        type: "UPDATE_THREAD",
        message,
    };
};
//teste
/*export const uploadimages = async (id) => {
    try {
        await axios.post("/images", {
            operation: "Accept Friend Request",
            otherUserId: id,
        });
        return {
            type: "ACCEPT_FRIEND",
            id,
        };
    } catch (err) {
        const { error } = err.response.data;
        return {
            type: "SET_ERROR",
            error,
        };
    }
}*/
