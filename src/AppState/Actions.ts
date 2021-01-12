import {
    CLOSE_LOGIN,
    CLOSE_SAVED_STATEMENTS,
    LOGIN,
    OPEN_LOGIN,
    OPEN_SAVED_STATEMENTS
} from "./ActionTypes";

export const login = (username: string, password: string) => ({
    type: LOGIN,
    payload: {
        username,
        password
    }
});

export const loadUser = (userId: string) => ({
    type: LOGIN,
    payload: {
        userId
    }
});

export const openSavedStatements = () => ({
    type: OPEN_SAVED_STATEMENTS,
    payload: {}
});

export const closeSavedStatements = () => ({
    type: CLOSE_SAVED_STATEMENTS,
    payload: {}
});

export const openLogin = () => ({
    type: OPEN_LOGIN,
    payload: {}
});

export const closeLogin = () => ({
    type: CLOSE_LOGIN,
    payload: {}
});