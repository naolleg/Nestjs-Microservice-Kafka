import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
  @MessagePattern('process-payment')
  handlePaymentCreated(@Payload() data:any)
  {
   console.log('Received payment:', data);

    
  }

}
