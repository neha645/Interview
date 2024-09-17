import mongoose from 'mongoose';
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: { type: String, required: true },
    class: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    level: { type: String, required: true },
    interviews: [{ type: Schema.Types.ObjectId, ref: 'Interview' }]
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
