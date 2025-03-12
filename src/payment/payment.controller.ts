import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PaymentDto } from './dto/payment.dto';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('payment')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiExcludeEndpoint()
  async createPayment(@Body() paymentDto: PaymentDto) {
    const payment = await this.paymentService.payment(paymentDto);
    return payment;
  }
}
