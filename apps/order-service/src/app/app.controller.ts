import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,@Inject("KAFKA_SERVICE")private readonly kafkaClient: ClientKafka) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
  @MessagePattern('order_created')
  handleOrderCreated(@Payload() order:any)
  {
    console.log('new order recieved',order);
    this.kafkaClient.emit("process-payment",order);
  }
}