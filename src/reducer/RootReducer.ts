import { Reducer, combineReducers } from "redux";
import selectionReducer from "./SelectionReducer";

const rootReducer: Reducer = combineReducers({
    selection: selectionReducer
});

export default rootReducer;