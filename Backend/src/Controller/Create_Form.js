import { InquiryForm } from '../model/inquiryForm_Model.js';

export const Create_Form = async (req, res) => {
    try {
        const { name, subject, email, phone, message } = req.body;

        const data = await InquiryForm.create({ name, subject, email, phone, message });

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