export const RESULT_VALUE_ACTION: string = "RESULT_VALUE_ACTION";

// ResultReducer.ts works with ResultActions

export function getResultValueAction(resultValue: number) {
    return {
        type: RESULT_VALUE_ACTION,
        resultValue: resultValue
    };
}