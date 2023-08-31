import * as selectionActions from "../actions/SelectionActions"

const initialState: {
    step: number,
    deviceType: string | undefined,
    brand: string | undefined,
    model: string | undefined,
    color: string | undefined,
    internalMemory: string | undefined
} = {
    step: 0,
    deviceType: undefined,
    brand: undefined,
    model: undefined,
    color: undefined,
    internalMemory: undefined
};

// SelectionReducer works with SelectionActions.ts

function selectionReducer(state = initialState, action: any) {
    switch (action.type) {
        case selectionActions.SELECT_STEP:
            return {
                ...state,
                step: action.step
            }
        case selectionActions.SELECT_DEVICE_TYPE:
            return {
                ...state,
                deviceType: action.deviceType
            }
        case selectionActions.SELECT_BRAND:
            return {
                ...state,
                brand: action.brand
            }
        case selectionActions.SELECT_MODEL:
            return {
                ...state,
                model: action.model
            }
        case selectionActions.SELECT_COLOR:
            return {
                ...state,
                color: action.color
            }
        case selectionActions.SELECT_INTERNAL_MEMORY:
            return {
                ...state,
                internalMemory: action.internalMemory
            }
        case selectionActions.RESET_STATE_PART:
            let i: number = 0;
            const entries: Array<any> = [];

            Object.entries(state).forEach((entry: any) => {
                if (i < action.step || i === 0) {
                    entries.push(entry);
                }
                i++;
            });

            return Object.fromEntries(entries);
    }

    return state;
}

export default selectionReducer;