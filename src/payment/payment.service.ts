import { Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
  constructor(private readonly configService: ConfigService) {}

  public async payment(dto: PaymentDto) {
    const response = await axios({
      method: 'POST',
      url: 'https://api.yookassa.ru/v3/payments',
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': Date.now(),
      },
      auth: {
        username: this.configService.getOrThrow<string>('USERNAME_YOOKASSA'),
        password: this.configService.getOrThrow<string>('SEKRET_KEY_YOOKASSA'),
      },
      data: {
        amount: {
          value: dto.amount,
          currency: 'RUB',
        },
        capture: true,
        confirmation: {
          type: 'redirect',
          return_url: this.configService.getOrThrow<string>('REDIRECT_URL_YOOKASSA'),
        },
      },
    });

    return response.data;
  }
}
