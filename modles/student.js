import mongoose from "mongoose";

const mongooseSchema = mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
});

const Student = mongoose.model('students', mongooseSchema)

export default Student;