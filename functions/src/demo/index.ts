import { Router } from 'express';
import createApi from '../common/createApi';

const demoRouter = Router();

demoRouter.get('/', (req, res) => {
  res.send({ msg: 'hit endpoints' });
});

export default createApi(demoRouter);
