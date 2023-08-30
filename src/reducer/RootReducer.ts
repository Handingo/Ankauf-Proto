import { Reducer, combineReducers } from "redux";
import selectionReducer from "./SelectionReducer";
import conditionReducer from "./ConditionReducer";
import functionalityReducer from "./FunctionalityReducer";
import resultReducer from "./ResultReducer";

// Redux wants to have one reducer, so we have to combine our different reducers
const rootReducer: Reducer = combineReducers({
    selection: selectionReducer,
    condition: conditionReducer,
    functionality: functionalityReducer,
    result: resultReducer
});

export default rootReducer;