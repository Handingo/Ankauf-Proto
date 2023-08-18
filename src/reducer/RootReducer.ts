import { Reducer, combineReducers } from "redux";
import selectionReducer from "./SelectionReducer";
import conditionReducer from "./ConditionReducer";
import functionalityReducer from "./FunctionalityReducer";

const rootReducer: Reducer = combineReducers({
    selection: selectionReducer,
    condition: conditionReducer,
    functionality: functionalityReducer
});

export default rootReducer;