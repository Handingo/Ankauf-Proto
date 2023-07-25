export const SELECT_STEP: string = "SELECT_STEP";
export const SELECT_DEVICE_TYPE: string = "SELECT_DEVICE_TYPE";
export const SELECT_BRAND: string = "SELECT_BRAND";
export const SELECT_MODEL: string = "SELECT_MODEL";
export const SELECT_COLOR: string = "SELECT_COLOR";
export const SELECT_INTERNAL_MEMORY: string = "SELECT_INTERNAL_MEMORY";
export const SELECT_CONDITION: string = "SELECT_CONDITION";

export function getSelectStepAction(step: number) {
    return {
        type: SELECT_STEP,
        step: step
    };
}

export function getSelectDeviceTypeAction(deviceType: string) {
    console.log(deviceType)
    return {
        type: SELECT_DEVICE_TYPE,
        deviceType: deviceType
    };
}

export function getSelectBrandAction(brand: string) {
    console.log(brand)
    return {
        type: SELECT_BRAND,
        brand: brand
    };
}

export function getSelectModelAction(model: string) {
    console.log(model)
    return {
        type: SELECT_MODEL,
        model: model
    };
}

export function getSelectColorAction(color: string) {
    console.log(color)
    return {
        type: SELECT_COLOR,
        color: color
    };
}

export function getSelectInternalMemoryAction(internalMemory: string) {
    console.log(internalMemory)
    return {
        type: SELECT_INTERNAL_MEMORY,
        internalMemory: internalMemory
    };
}

export function getSelectConditionAction(condition: string) {
    console.log(condition)
    return {
        type: SELECT_CONDITION,
        condition: condition
    };
}