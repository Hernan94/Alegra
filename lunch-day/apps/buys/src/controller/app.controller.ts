import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../service/app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/provide-ingredients')
  async provideIngredients(@Body('ingredients') ingredients: any[]) {
    const allIngredientsAvailable = await this.appService.checkIngredients(ingredients);

    if (allIngredientsAvailable) {
      this.appService.reduceIngredients(ingredients);
      return { success: true, message: 'Ingredients are available and have been provided.' };
    } else {
      return { success: false, message: 'Some ingredients are not available in stock.' };
    }
  }

  // Endpoint que compra ingredientes en la plaza de mercado si no están disponibles
  @Post('/restock-ingredients')
  async restockIngredients(@Body('ingredients') ingredients: any[]) {
    const restockResults = await this.appService.restockIngredients(ingredients);
    return restockResults;
  }
}
