import { Router } from 'express';
import exampleRouter from './stream.route';

const router = Router();
const prefix: string = '/api';

router.use(`${prefix}/stream`, exampleRouter);

export default router;
