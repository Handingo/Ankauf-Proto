import { Reducer, combineReducers } from "redux";
import selectionReducer from "./SelectionReducer";
import functionalityReducer from "./FunctionalityReducer";

// Verbindet mehrere Reducer miteinander

const rootReducer: Reducer = combineReducers({
    selection: selectionReducer,
    functionality: functionalityReducer
});

export default rootReducer;