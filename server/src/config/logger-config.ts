import dotenv from 'dotenv';
import { Params } from 'nestjs-pino';

dotenv.config({ path: '.env.development' });
const config: Params = {
  pinoHttp: {
    level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    prettyPrint: {
      colorize: true,
      levelFirst: true,
      translateTime: 'SYS:yyyy. mm. dd. TT HH:MM:ss',
      ignore: 'hostname',
    },
  },
  forRoutes: ['*'],
  renameContext: 'HTTP',
};

export default config;
