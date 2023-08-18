export const FULLY_FUNCTIONAL_ACTION: string = "FULLY_FUNCTIONAL_ACTION";
export const HAS_GARANTY_ACTION: string = "HAS_GARANTY_ACTION";
export const HAS_SIM_LOCK_ACTION: string = "HAS_SIM_LOCK_ACTION";
export const HAS_ACTIVATION_LOCK_ACTION: string = "HAS_ACTIVATION_LOCK_ACTION";
export const IS_MDM_ACTIVE_ACTION: string = "IS_MDM_ACTIVE_ACTION";

// FunctionalityReducer.ts works with FunctionalityActions

export function getFullyFunctionalAction(isFullyFunctional: boolean) {
    return {
        type: FULLY_FUNCTIONAL_ACTION,
        isFullyFunctional: isFullyFunctional
    };
}

export function getGarantyAction(hasGaranty: boolean) {
    return {
        type: HAS_GARANTY_ACTION,
        hasGaranty: hasGaranty
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

export function getMDMActiveAction(isMDMActive: boolean) {
    return {
        type: IS_MDM_ACTIVE_ACTION,
        isMDMActive: isMDMActive
    };
}