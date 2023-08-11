import { Reducer, combineReducers } from "redux";
import selectionReducer from "./SelectionReducer";

// Optional um mehrere Reducer verwalten zu wollen

const rootReducer: Reducer = combineReducers({
    selection: selectionReducer
});

export default rootReducer;