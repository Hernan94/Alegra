import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../service/app.service';
import EventEmitter2 from 'eventemitter2';


@Controller('kitchen')
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly eventEmitter: EventEmitter2
  ) {}
  @Post('/prepare-dish')
  async prepareDish(@Body('orderId') orderId: string) {
    const dish = this.appService.selectRandomDish();

    // Solicitar ingredientes al servicio de bodega
    const ingredientsReady = await this.appService.requestIngredients(dish);

    if (ingredientsReady) {
      // Preparar el plato y enviar el evento 'OrderCompleted'
      this.appService.prepareDish(dish);
      this.eventEmitter.emit('OrderCompleted', { orderId, dish });

      return { message: `Dish ${dish.name} prepared successfully`, orderId };
    } else {
      return { message: 'Ingredients are not available at the moment', orderId };
    }
  }
  
}
