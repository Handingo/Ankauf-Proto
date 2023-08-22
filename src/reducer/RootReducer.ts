import { Reducer, combineReducers } from "redux";
import selectionReducer from "./SelectionReducer";
import conditionReducer from "./ConditionReducer";
import functionalityReducer from "./FunctionalityReducer";
import resultReducer from "./ResultReducer";

const rootReducer: Reducer = combineReducers({
    selection: selectionReducer,
    condition: conditionReducer,
    functionality: functionalityReducer,
    result: resultReducer
});

export default rootReducer;