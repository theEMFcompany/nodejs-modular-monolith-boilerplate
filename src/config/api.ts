import cors, {CorsOptions} from 'cors';
import {Router} from 'express';
const router = Router();

import {routes as AuthRoutes} from '../components/Auth/';

const corOption: CorsOptions = {
    origin: (origin, callback) => {
      const whitelist = [process.env.FRONT_END_URL, ];
      if(whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    optionsSuccessStatus: 200
};

router.use(cors(corOption));

router.use('/auth', AuthRoutes);
export default router;