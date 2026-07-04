import express from 'express'
import { Create_Form } from "../Controller/Create_Form.js";
import { GetData } from '../Controller/Create_Form.js';
import { Update_Form } from "../Controller/Update_From.js";
import { Delete_Form } from "../Controller/Delete_Form.js";

const route = express.Router();

route.post('/Submit', Create_Form)
route.get('/form/all', GetData)
route.put('/update/:id', Update_Form)
route.delete('/delete/:id', Delete_Form)

export default route;