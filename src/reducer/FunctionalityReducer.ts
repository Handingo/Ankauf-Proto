import * as functionalityActions from "../actions/FunctionalityActions"

const initialState: {
    isFullyFunctional: boolean | undefined,
    hasGaranty: boolean | undefined,
    hasSimLock: boolean | undefined,
    hasActivationLock: boolean | undefined,
    isMDMActive: boolean | undefined
} = {
    isFullyFunctional: undefined,
    hasGaranty: undefined,
    hasSimLock: undefined,
    hasActivationLock: undefined,
    isMDMActive: undefined
};

// FunctionalityReducer works with FunctionalityActions.ts

function functionalityReducer(state = initialState, action: any) {
    switch (action.type) {
        case functionalityActions.FULLY_FUNCTIONAL_ACTION:
            return {
                ...state,
                isFullyFunctional: action.isFullyFunctional
            }
        case functionalityActions.HAS_GARANTY_ACTION:
            return {
                ...state,
                hasGaranty: action.hasGaranty
            }
        case functionalityActions.HAS_SIM_LOCK_ACTION:
            return {
                ...state,
                hasSimLock: action.hasSimLock
            }
        case functionalityActions.HAS_ACTIVATION_LOCK_ACTION:
            return {
                ...state,
                hasActivationLock: action.hasActivationLock
            }
        case functionalityActions.IS_MDM_ACTIVE_ACTION:
            return {
                ...state,
                isMDMActive: action.isMDMActive
            }
    }

    return state;
}

export default functionalityReducer;