import * as functionalityActions from "../actions/FunctionalityActions";

const initialState: {
    isKindaOld: boolean | undefined,
    functionalityDetails: {
        display: false,
        call: false,
        battery: false,
        camera: false,
        connectivity: false,
        biometry: false,
        sensors: false,
        buttons: false,
        storage: false
    } | undefined,
    hasSimLock: boolean | undefined,
    hasActivationLock: boolean | undefined,
    isMDMActive: boolean | undefined
} = {
    isKindaOld: undefined,
    functionalityDetails: undefined,
    hasSimLock: undefined,
    hasActivationLock: undefined,
    isMDMActive: undefined
};

// FunctionalityReducer works with FunctionalityActions.ts

function functionalityReducer(state = initialState, action: any) {
    switch (action.type) {
        case functionalityActions.FUNCTIONALITY_DETAILS_ACTION:
            return {
                ...state,
                functionalityDetails: action.functionalityDetails
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