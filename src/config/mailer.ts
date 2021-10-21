import nodemailer from 'nodemailer';
import * as C from '../constants/';
import * as utils from '../utils/';

var smtpConfig = {
  host: process.env.MAIL_HOST,
  port: 587,
  // secure: true, // use SSL
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
};

export const init = (mediator, config = smtpConfig, defaults = {} ) => {
  mediator.once(C.events.MAILER_START, () => {
    const transport = nodemailer.createTransport(config, defaults)
    transport.verify((error, _success) => {
      if(error) {
          utils.log.error(error.message);
          mediator.emit(C.events.MAILER_ERROR, error);
      } else {
        utils.log.info('mailer ready')
        mediator.emit(C.events.MAILER_READY, transport);
      }
    })
  })
};