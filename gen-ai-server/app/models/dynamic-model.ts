import mongoose, { Model } from "mongoose";

const Schema = mongoose.Schema;
const dynamicUserSchema = new Schema(
    {},
    { versionKey: false, strict: false, minimize: false }
);
let dynamicModels: { [key: string]: Model<any> } = {};

const dynamicModel = (collectionName: string) => {
    if (!(collectionName in dynamicModels)) {
        dynamicModels[collectionName] = mongoose.model(
            collectionName,
            dynamicUserSchema,
            collectionName
        );
    }
    return dynamicModels[collectionName];
};

module.exports = dynamicModel;
