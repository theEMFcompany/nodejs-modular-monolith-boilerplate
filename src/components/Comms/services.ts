let mailer;
let templates;

export function initMailer(_mailer): void {
  mailer = _mailer;
}

export function initTemplates(_templates): void {
  templates = _templates;
}

export const sendVerificationEmail = async({email, token}) => {
  const html = templates.verifyEmail({redirectUrl: process.env.FRONT_END_URL + '/verify?accessToken=' + token});
  return mailer.sendMail({
    'from': 'hello@briefcart.com',
    'to': email,
    // 'bcc':bcc,
    'subject': 'Verify Your Email',
    html
  });
};