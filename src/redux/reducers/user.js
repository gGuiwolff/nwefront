export const user = (state = {}, action) => {
    switch (action.type) {
        case "RECEIVE_USER":
            state = action.user;
            break;
        case "CHANGE_PROFILE_PICTURE":
            state = { ...state, profile_picture: action.updated };
            break;
        case "CHANGE_BIO":
            state = { ...state, bio: action.updated };
            break;
        default:
            return state;
    }
    return state;
};
