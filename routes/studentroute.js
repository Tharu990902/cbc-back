import express from 'express';
import { Cretestudent , Getstudent ,Deletestudent} from '../contollers/studentcontroller.js';


const StudentRoute = express.Router();

StudentRoute.get('/', Getstudent);
StudentRoute.post('/' , Cretestudent);
StudentRoute.delete('/', Deletestudent)

export default StudentRoute;