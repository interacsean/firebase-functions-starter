import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

export default function createApi(router?: express.Router, routerName?: string) {
  const api = express();

  api.use(cors());
  api.use(bodyParser.json());
  api.use(bodyParser.urlencoded({ extended: false }));

  if (router !== undefined) {
    api.use(process.env.PREFIX ? `${process.env.PREFIX || ""}${routerName}` : "", router);
  }

  return api;
};
