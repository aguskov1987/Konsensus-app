import {ApiUser} from "../ApiModels/ApiUser";
import {ApiHiveManifest} from "../ApiModels/ApiHiveManifest";
import {HiveManifest} from "../ViewModels/HiveManifest";
import {FoundStatement} from "../ViewModels/Statement";
import {SubGraph} from "../ViewModels/SubGraph";

// region User
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";
export const USER_LOADED = "USER_LOADED";
export const USER_LOAD_FAILED = "USER_LOAD_FAILED";

export const userLoggedInAction = () => ({
    type: USER_LOGGED_IN,
    payload: {}
})

export const userLoadedAction = (user: ApiUser) => ({
    type: USER_LOADED,
    payload: user
})

export const userLoginFailedAction = () => ({
    type: USER_LOGIN_FAILED,
    payload: {}
})
// endregion

// region Saved Hives
export const OPEN_MY_HIVES = "OPEN_MY_HIVES";
export const CLOSE_MY_HIVES = "CLOSE_MY_HIVES";
export const USER_SAVED_HIVES_LOADED = "USER_SAVED_HIVES_LOADED";
export const USER_SAVED_HIVES_LOAD_FAILED = "USER_SAVED_HIVES_LOAD_FAILED";

export const openMyHivesAction = () => ({
    type: OPEN_MY_HIVES,
    payload: {}
});

export const closeMyHivesAction = () => ({
    type: CLOSE_MY_HIVES,
    payload: {}
});

export const userSavedHivesLoaded = (items: ApiHiveManifest[]) => ({
    type: USER_SAVED_HIVES_LOADED,
    payload: items
});

export const userSavedHivesLoadFailedAction = (error: string) => ({
    type: USER_SAVED_HIVES_LOAD_FAILED,
    payload: error
});
// endregion

// region Saved Statements
export const OPEN_SAVED_STATEMENTS = "GO_TO_SAVED_STATEMENTS";
export const CLOSE_SAVED_STATEMENTS = "CLOSE_SAVED_STATEMENTS";

export const openSavedStatementsAction = () => ({
    type: OPEN_SAVED_STATEMENTS,
    payload: {}
});

export const closeSavedStatementsAction = () => ({
    type: CLOSE_SAVED_STATEMENTS,
    payload: {}
});
// endregion

// region New Statement
export const OPEN_CREATE_STATEMENT = "OPEN_CREATE_STATEMENT";
export const CLOSE_CREATE_STATEMENT = "CLOSE_CREATE_STATEMENT";

export const openCreateNewStatementAction = () => ({
    type: OPEN_CREATE_STATEMENT,
    payload: {}
});

export const closeCreateNewStatementAction = () => ({
    type: CLOSE_CREATE_STATEMENT,
    payload: {}
});
// endregion

// region New Hive
export const OPEN_CREATE_NEW_HIVE = "OPEN_CREATE_NEW_HIVE";
export const CLOSE_CREATE_NEW_HIVE = "CLOSE_CREATE_NEW_HIVE";
export const INIT_CREATING_NEW_HIVE = "BEGIN_CREATING_NEW_HIVE";
export const NEW_HIVE_CREATED = "NEW_HIVE_CREATED";
export const NEW_HIVE_FAILED = "NEW_HIVE_FAILED"

export const initNCreateNewHiveAction = () => ({
    type: INIT_CREATING_NEW_HIVE,
    payload: {}
});

export const newHiveCreatedAction = (hive: HiveManifest) => ({
    type: NEW_HIVE_CREATED,
    payload: hive
});

export const openCreateNewHiveAction = () => ({
    type: OPEN_CREATE_NEW_HIVE,
    payload: {}
});

export const closeCreateNewHiveAction = () => ({
    type: CLOSE_CREATE_NEW_HIVE,
    payload: {}
});

export const newHiveFailedAction = (error: string) => ({
    type: NEW_HIVE_FAILED,
    payload: error
})
// endregion

// region The Yard
export const OPEN_HIVE_YARD = "OPEN_HIVE_YARD";
export const CLOSE_HIVE_YARD = "CLOSE_HIVE_YARD";
export const SEARCHED_HIVES_FOUND = "SEARCHED_HIVES_FOUND";
export const HIVE_SEARCH_FAILED = "HIVE_SEARCH_FAILED";

export const openHiveYardAction = () => ({
    type: OPEN_HIVE_YARD,
    payload: {}
});

export const closeHiveYardAction = () => ({
    type: CLOSE_HIVE_YARD,
    payload: {}
});

export const searchedHivesFoundAction = (hives: HiveManifest[]) => ({
    type: SEARCHED_HIVES_FOUND,
    payload: hives
});

export const hiveSearchFailedAction = (error: string) => ({
    type: HIVE_SEARCH_FAILED,
    payload: error
})
// endregion

// region Current Hive
export const HIVE_LOADED = "HIVE_LOADED";
export const HIVE_LOAD_FAILED = "HIVE_LOAD_FAILED";
export const SUBGRAPH_LOADED = "SUBGRAPH_LOADED";
export const SUBGRAPH_LOAD_FAILED = "SUBGRAPH_LOAD_FAILED";


export const hiveLoadedAction = (manifest: ApiHiveManifest) => ({
    type: HIVE_LOADED,
    payload: manifest
});

export const hiveLoadFailedAction = (error: string) => ({
    type: HIVE_LOAD_FAILED,
    payload: error
})

export const subgraphLoadedAction = (data: SubGraph) => ({
    type: SUBGRAPH_LOADED,
    payload: data
});

export const subgraphLoadFailedAction = (error: string) => ({
    type: SUBGRAPH_LOAD_FAILED,
    payload: error
});
// endregion

// region Search
export const SEARCHED_STATEMENTS_FOUND = "SEARCHED_STATEMENTS_FOUND";
export const INIT_STATEMENT_SEARCH = "INIT_STATEMENT_SEARCH";

export const initStatementSearchAction = () => ({
    type: INIT_STATEMENT_SEARCH,
    payload: {}
})

export const searchedStatementsFoundAction = (statements: FoundStatement[]) => ({
    type: SEARCHED_STATEMENTS_FOUND,
    payload: statements
});
// endregion

// region Hive Operations
export const SELECT_STATEMENT = "SELECT_STATEMENT";
export const CONNECT_STATEMENT_TO_STATEMENT = "CONNECT_STATEMENT_TO_STATEMENT";
export const RESPOND_TO_STATEMENT = "RESPOND_TO_STATEMENT";
export const RESPOND_TO_EFFECT = "RESPOND_TO_EFFECT";

export const UPDATE_RESPONSE_VIEW = "UPDATE_RESPONSE_VIEW"
export const UPDATE_LAYOUT = "UPDATE_LAYOUT"
// endregion
