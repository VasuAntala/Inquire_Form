import express from 'express'
import { Create_Form } from "../Controller/Create_Form.js";
import { GetData } from '../Controller/Create_Form.js';
import { Update_Form } from "../Controller/Update_From.js";
import { Delete_Form } from "../Controller/Delete_Form.js";

const route = express.Router();

route.post('/api/inquiries', Create_Form)
route.get('/api/inquiries', GetData)
route.put('/api/inquiries/:id', Update_Form)
route.delete('/api/inquiries/:id', Delete_Form)

export default route;