import express from 'express';
import {Createuser,  LoginUser , GoogleLogin , Getuser} from '../contollers/usercontroller.js';

const UserRoute =  express.Router();

UserRoute.post('/', Createuser);
UserRoute.get('/', Getuser);
UserRoute.post('/login', LoginUser);
UserRoute.post('/google',GoogleLogin)

export default UserRoute;