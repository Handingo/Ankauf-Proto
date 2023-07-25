import { Reducer, combineReducers } from "redux";
import sessionReducer from "./SessionReducer";
import selectionReducer from "./SelectionReducer";

const rootReducer: Reducer = combineReducers({
    session: sessionReducer,
    selection: selectionReducer
});

export default rootReducer;