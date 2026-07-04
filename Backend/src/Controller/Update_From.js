import { InquiryForm } from '../model/inquiryForm_Model.js';

export const Update_Form = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, subject, email, phone, message } = req.body;

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

        const data = await InquiryForm.findByIdAndUpdate(
            id,
            {
                name,
                subject,
                email,
                phone,
                message
            },
            { new: true } // return updated document
        );

        if (!data) {
            return res.status(404).json({ success: false, message: 'Record not found' });
        }

        console.log("Form Updated Successfully", data);
        res.status(200).json({ success: true, data });
    } catch (err) {
        console.error("Error updating form:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};