import express from 'express';
import {Createuser,  LoginUser} from '../contollers/usercontroller.js';

const UserRoute =  express.Router();

UserRoute.post('/', Createuser);
UserRoute.post('/login', LoginUser);

export default UserRoute;