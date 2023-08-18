import * as conditionActions from "../actions/ConditionActions"

const initialState: {
    selectedConditions: Array<Number>,
    result: string | undefined
} = {
    selectedConditions: [0, 0, 0, 0], // stores condition value for each device part
    result: undefined // determined condition name
};

// ConditionReducer works with ConditionActions.ts

function conditionReducer(state = initialState, action: any) {
    switch (action.type) {
        case conditionActions.SELECT_PART_CONDITION_ACTION:
            const selectedConditions = [...state.selectedConditions]
            selectedConditions[action.part] = action.condition;

            return {
                ...state,
                selectedConditions: selectedConditions
            }
        case conditionActions.RESULT_ACTION:
            return {
                ...state,
                result: action.result
            }
    }

    return state;
}

export default conditionReducer;