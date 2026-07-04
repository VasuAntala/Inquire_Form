import mongoose from 'mongoose'

export const InquiryForm = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    subject:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    phone:
    {
        type: String,
        required: true
    },
    message:
    {
        type: String,
        required: true
    },
    CreatedAt:
    {
        type: Date.now()
    }
})

const Inquiry_Form = new mongoose.model("inquiry_forms", InquiryForm)

