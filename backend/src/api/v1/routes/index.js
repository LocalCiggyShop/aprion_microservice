
/**
 * 
 * /routes/main/index.js
 * 
 * @description:: Index file for MAIN sub-applicaton
 * 
 */

import express from 'express';
import versionRouter from '../index.js';

const MainRouter = express.Router();

MainRouter.use('/v1', versionRouter);

export default MainRouter;