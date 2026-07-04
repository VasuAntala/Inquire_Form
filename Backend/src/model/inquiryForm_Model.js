import mongoose from 'mongoose'

const inquiryFormSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    subject: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    message: {
        type: String,
        trim: true,
        required: true
    }
}, { timestamps: true })

export const InquiryForm = mongoose.model("inquiry_forms", inquiryFormSchema)
