import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
    id: { type: String, required: true },
    stdId: { type: String, required: true }, 
    level: { type: String, required: true },
    skills: { type: String, required: true },
    score: { type: String, required: true },
    result: { type: String, required: true },
    interviewer: { type: String, required: true },
    date: { type: String, required: true }
});

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;
