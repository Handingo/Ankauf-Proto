import * as functionalityActions from "../actions/FunctionalityActions";

const initialState: {
    isKindaOld: boolean | undefined,
    wantsAppTest: boolean | undefined,
    hasSimLock: boolean | undefined,
    hasActivationLock: boolean | undefined,
    functionalityDetails: {
        display: boolean,
        call: boolean,
        battery: boolean,
        camera: boolean,
        connectivity: boolean,
        performance: false,
        biometry: boolean,
        sensors: boolean,
        buttons: boolean,
        storage: boolean
    } | undefined
} = {
    isKindaOld: undefined,
    wantsAppTest: undefined,
    hasSimLock: undefined,
    hasActivationLock: undefined,
    functionalityDetails: undefined
};

// FunctionalityReducer works with FunctionalityActions.ts

function functionalityReducer(state = initialState, action: any) {
    switch (action.type) {
        case functionalityActions.WANTS_APP_TEST_ACTION:
            return {
                ...state,
                wantsAppTest: action.wantsAppTest
            }
        case functionalityActions.IS_KINDA_OLD_ACTION:
            return {
                ...state,
                isKindaOld: action.isKindaOld
            }
        case functionalityActions.FUNCTIONALITY_DETAILS_ACTION:
            return {
                ...state,
                functionalityDetails: action.functionalityDetails
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
    }

    return state;
}

export default functionalityReducer;