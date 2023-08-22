import * as functionalityActions from "../actions/FunctionalityActions";

const initialState: {
    isFullyFunctional: boolean | undefined,
    isKindaOld: boolean | undefined,
    hasSimLock: boolean | undefined,
    hasActivationLock: boolean | undefined,
    isMDMActive: boolean | undefined
} = {
    isFullyFunctional: undefined,
    isKindaOld: undefined,
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
        case functionalityActions.IS_KINDA_OLD_ACTION:
            return {
                ...state,
                isKindaOld: action.isKindaOld
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