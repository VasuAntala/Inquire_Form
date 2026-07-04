import { InquiryForm } from '../model/inquiryForm_Model.js';

export const Update_Form = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, subject, email, phone, message } = req.body;

        const data = await InquiryForm.findByIdAndUpdate(
            id,
            { name, subject, email, phone, message },
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