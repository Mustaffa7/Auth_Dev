import mongoose, { Schema, Types } from "mongoose";



//export interface IUser extends mongoose.Document{
//    name: String;
//    email: String;
//    password: String;
//    contact: String;
//    dob: String;
//}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;