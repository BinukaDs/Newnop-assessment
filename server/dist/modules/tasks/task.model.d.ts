import mongoose from "mongoose";
declare const TaskModel: mongoose.Model<{
    [x: number]: unknown;
    [x: symbol]: unknown;
    [x: string]: unknown;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    [x: number]: unknown;
    [x: symbol]: unknown;
    [x: string]: unknown;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    [x: number]: unknown;
    [x: symbol]: unknown;
    [x: string]: unknown;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    [x: number]: unknown;
    [x: symbol]: unknown;
    [x: string]: unknown;
}, mongoose.Document<unknown, {}, {
    [x: number]: unknown;
    [x: symbol]: unknown;
    [x: string]: unknown;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    [x: number]: unknown;
    [x: symbol]: unknown;
    [x: string]: unknown;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    [x: number]: {};
    [x: symbol]: {};
    [x: string]: {};
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}>, {
    [x: number]: {};
    [x: symbol]: {};
    [x: string]: {};
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export default TaskModel;
//# sourceMappingURL=task.model.d.ts.map