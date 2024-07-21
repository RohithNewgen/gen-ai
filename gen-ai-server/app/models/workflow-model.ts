import mongoose, { Model } from "mongoose";

const Schema = mongoose.Schema;
const workflowSchema = new Schema(
    {},
    { versionKey: false, strict: false, minimize: false }
);
let dynamicModels: { [key: string]: Model<any> } = {};

const workflowModel = (collectionName: string) => {
    if (!(collectionName in dynamicModels)) {
        dynamicModels[collectionName] = mongoose.model(
            collectionName,
            workflowSchema,
            collectionName
        );
    }
    return dynamicModels[collectionName];
};

module.exports = workflowModel;
