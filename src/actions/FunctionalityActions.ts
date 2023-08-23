export const IS_KINDA_OLD_ACTION: string = "IS_KINDA_OLD_ACTION";
export const WANTS_APP_TEST_ACTION: string = "WANTS_APP_TEST_ACTION";
export const FUNCTIONALITY_DETAILS_ACTION: string = "FUNCTIONALITY_DETAILS_ACTION";
export const HAS_SIM_LOCK_ACTION: string = "HAS_SIM_LOCK_ACTION";
export const HAS_ACTIVATION_LOCK_ACTION: string = "HAS_ACTIVATION_LOCK_ACTION";

// FunctionalityReducer.ts works with FunctionalityActions

export function getKindaOldAction(isKindaOld: boolean) {
    return {
        type: IS_KINDA_OLD_ACTION,
        isKindaOld: isKindaOld
    };
}

export function getAppTestAction(wantsAppTest: boolean) {
    return {
        type: WANTS_APP_TEST_ACTION,
        wantsAppTest: wantsAppTest
    };
}

export function getFunctionalityDetailsAction(functionalityDetails: any) {
    return {
        type: FUNCTIONALITY_DETAILS_ACTION,
        functionalityDetails: functionalityDetails
    };
}

export function getSimLockAction(hasSimLock: boolean) {
    return {
        type: HAS_SIM_LOCK_ACTION,
        hasSimLock: hasSimLock
    };
}

export function getActivationLockAction(hasActivationLock: boolean) {
    return {
        type: HAS_ACTIVATION_LOCK_ACTION,
        hasActivationLock: hasActivationLock
    };
}