import { PayloadAction } from "@reduxjs/toolkit";

import { InputElementType } from "../../../types/node-json";
import { createAppSlice } from "../../createAppSlice";

export type WorkflowStateType = {
    name: string;
    parameterData: {
        [key: string]: {
            [key: string]: InputElementType[];
        };
    };
};

const initialState: WorkflowStateType = {
    name: "",
    parameterData: {},
};

const workflowSlice = createAppSlice({
    name: "workflow",
    initialState,
    reducers: (create) => ({
        setWorkflow: create.reducer(
            (state, action: PayloadAction<WorkflowStateType>) => {
                state = {
                    ...state,
                    ...action.payload,
                };
            }
        ),
    }),
    selectors: {
        getState: (state) => state,
    },
});

export const { setWorkflow } = workflowSlice.actions;
export const { getState } = workflowSlice.selectors;
export default workflowSlice;
