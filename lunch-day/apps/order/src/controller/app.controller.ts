import { Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Response } from 'express';

@Controller('order')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/request-dish')
  async requestDish(@Res() res: Response) {
    try {
      
      const selectedDish = this.appService.selectRandomDish();
      return res.status(HttpStatus.CREATED).json({
        orderId: '123456', 
        message: 'Dish requested successfully',
        selectedDish: selectedDish
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Could not process the request'
      });
    }
  }

  @Get('/orders')
  async getOrders(@Query('status') status: string, @Res() res: Response) {
    try {
      const orders = this.appService.getOrdersByStatus(status);
      return res.status(HttpStatus.OK).json({ orders });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Could not fetch orders'
      });
    }
  }

  @Get('/recipe-list')
  async getRecipeList(@Res() res: Response) {
    try {
     
      const recipes = this.appService.getRecipes();
      return res.status(HttpStatus.OK).json({ recipes });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Could not fetch recipes'
      });
    }
  }


  
}

