import * as functionalityActions from "../actions/FunctionalityActions";

const initialState: {
    isKindaOld: boolean | undefined, // is your device older than 2 years?
    wantsAppTest: boolean | undefined, // do you want to test your device via app?
    hasSimLock: boolean | undefined,
    hasActivationLock: boolean | undefined, // GoogleID/AppleID
    details: { // which of these modules are working well?
        display: boolean,
        call: boolean,
        battery: boolean,
        camera: boolean,
        connectivity: boolean,
        performance: boolean,
        biometry: boolean,
        sensors: boolean,
        buttons: boolean,
        storage: boolean
    } | undefined,
    checkedDetails: false
} = {
    isKindaOld: undefined,
    wantsAppTest: undefined,
    hasSimLock: undefined,
    hasActivationLock: undefined,
    details: { // which of these modules are working well?
        display: false,
        call: false,
        battery: false,
        camera: false,
        connectivity: false,
        performance: false,
        biometry: false,
        sensors: false,
        buttons: false,
        storage: false
    },
    checkedDetails: false
};

// FunctionalityReducer works with FunctionalityActions.ts

function functionalityReducer(state = initialState, action: any) {
    switch (action.type) {
        case functionalityActions.WANTS_APP_TEST_ACTION:
            return {
                ...state,
                wantsAppTest: action.wantsAppTest
            };
        case functionalityActions.IS_KINDA_OLD_ACTION:
            return {
                ...state,
                isKindaOld: action.isKindaOld
            };
        case functionalityActions.FUNCTIONALITY_DETAIL_ACTION:
            return {
                ...state,
                details: {
                    ...state.details,
                    [action.functionality]: action.value
                }
            };
        case functionalityActions.CHECK_DETAILS_ACTION:
            return {
                ...state,
                checkedDetails: true
            };
        case functionalityActions.HAS_SIM_LOCK_ACTION:
            return {
                ...state,
                hasSimLock: action.hasSimLock
            };
        case functionalityActions.HAS_ACTIVATION_LOCK_ACTION:
            return {
                ...state,
                hasActivationLock: action.hasActivationLock
            };
    }

    return state;
}

export default functionalityReducer;