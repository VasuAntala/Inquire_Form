import { InquiryForm } from '../model/inquiryForm_Model.js';

export const Create_Form = async (req, res) => {
    try {
        const { name, subject, email, phone, message } = req.body;

        // Validation: check that any field is not empty
        if (!name || !subject || !email || !phone || !message) {
            return res.status(400).json({ success: false, message: "All fields (name, subject, email, phone, message) are required." });
        }

        if (
            typeof name !== 'string' || !name.trim() ||
            typeof subject !== 'string' || !subject.trim() ||
            typeof email !== 'string' || !email.trim() ||
            typeof phone !== 'string' || !phone.trim() ||
            typeof message !== 'string' || !message.trim()
        ) {
            return res.status(400).json({ success: false, message: "All fields must contain valid non-empty text." });
        }

        const data = await InquiryForm.create({
            name,
            subject,
            email,
            phone,
            message
        });

        console.log("Form Submitted Successfully", data);

        res.status(201).json({ success: true, data });
    } catch (err) {
        console.error("Error submitting form:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};


export const GetData = async (req, res) => {
    try {
        const data = await InquiryForm.find({});
        return res.status(200).json({ success: true, message: "Data Received Successfully", data });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};