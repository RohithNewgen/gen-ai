import type { RootState } from "./store";
const getUser = (state: RootState) => state.user;
const getWorkflow = (state: RootState) => state.workflow;
// const getSidebar = (state:RootState) => state.sidebar;
// const getCommon = (state:RootState) => state.common;

export {
    getUser,
    getWorkflow,
    // getSidebar,
    // getCommon
};
