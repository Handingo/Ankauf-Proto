import * as resultActions from "../actions/ResultActions";

const initialState: {
    resultValue: number
} = {
    resultValue: 0.0
};

function resultReducer(state = initialState, action: any) {
    switch (action.type) {
        case resultActions.RESULT_VALUE_ACTION:
            return {
                ...state,
                resultValue: action.resultValue
            };
    }

    return state;
}

export default resultReducer;