import { InquiryForm } from "../model/inquiryForm_Model.js";

export const Delete_Form = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await InquiryForm.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).json({ success: false, message: "Data Cannot Be Found" });
        }

        console.log("Data Deleted Successfully", data);
        res.status(200).json({ success: true, message: "Data Deleted Successfully", data });
    }
    catch (err) {
        console.error("Error deleting form:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};