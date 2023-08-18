export const SELECT_PART_CONDITION_ACTION: string = "SELECT_PART_CONDITION_ACTION";
export const RESULT_ACTION: string = "RESULT_ACTION";

// ConditionReducer.ts works with ConditionActions

export function getSelectPartConditionAction(part: number, condition: number) {
    return {
        type: SELECT_PART_CONDITION_ACTION,
        part: part,
        condition: condition
    };
}

export function getResultAction(result: string) {
    return {
        type: RESULT_ACTION,
        result: result
    };
}