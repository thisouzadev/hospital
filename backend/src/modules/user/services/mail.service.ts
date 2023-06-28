import { Injectable } from '@nestjs/common';
import { MailService as SendGridMailService } from '@sendgrid/mail';

@Injectable()
export class MailService {
  private readonly mailer: SendGridMailService;
  private readonly sendGridApiKey: string =
    'd-9995a92339564a8e91d26bbed772b84d';

  constructor(private readonly mailService: MailService) {
    this.mailer = new SendGridMailService();
    this.mailer.setApiKey(this.sendGridApiKey);
  }

  async sendEmail(options: SendEmailOptions): Promise<void> {
    const { to, subject, html } = options;

    const msg = {
      to,
      from: 'seu_email@gmail.com', // Insira o endereço de e-mail do remetente
      subject,
      html,
    };

    await this.mailer.send(msg);
  }
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}
