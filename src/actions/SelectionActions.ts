export const SELECT_STEP: string = "SELECT_STEP";
export const SELECT_DEVICE_TYPE: string = "SELECT_DEVICE_TYPE";
export const SELECT_BRAND: string = "SELECT_BRAND";
export const SELECT_MODEL: string = "SELECT_MODEL";
export const SELECT_COLOR: string = "SELECT_COLOR";
export const SELECT_INTERNAL_MEMORY: string = "SELECT_INTERNAL_MEMORY";
export const SELECT_CONDITION: string = "SELECT_CONDITION";
export const RESET_STATE_PART: string = "RESET_STATE_PART";

// SelectionReducer.ts works with SelectionActions

export function getSelectStepAction(step: number) {
    return {
        type: SELECT_STEP,
        step: step
    };
}

export function getSelectDeviceTypeAction(deviceType: string) {
    return {
        type: SELECT_DEVICE_TYPE,
        deviceType: deviceType
    };
}

export function getSelectBrandAction(brand: string) {
    return {
        type: SELECT_BRAND,
        brand: brand
    };
}

export function getSelectModelAction(model: string) {
    return {
        type: SELECT_MODEL,
        model: model
    };
}

export function getSelectColorAction(color: string) {
    return {
        type: SELECT_COLOR,
        color: color
    };
}

export function getSelectInternalMemoryAction(internalMemory: string) {
    return {
        type: SELECT_INTERNAL_MEMORY,
        internalMemory: internalMemory
    };
}

export function getSelectConditionAction(condition: string) {
    return {
        type: SELECT_CONDITION,
        condition: condition
    };
}

export function getResetStatePartAction(step: number) {
    return {
        type: RESET_STATE_PART,
        step: step
    };
}