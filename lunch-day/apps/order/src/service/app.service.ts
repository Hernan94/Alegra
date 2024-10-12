import { Injectable } from '@nestjs/common';
import { IAppService } from 'src/interfaces/app-service.interface';
import { Order, Recipe } from 'src/model/data';

@Injectable()
export class AppService implements IAppService {

  selectRandomDish() {
    const recipes:Recipe[] = this.getRecipes();
    const randomIndex = Math.floor(Math.random() * recipes.length);
    return recipes[randomIndex];
  }

  getOrdersByStatus(status: string) {
    const orders:Order[] = [
      {
        orderId: '123456',
        dish: 'Tomato Soup',
        status: 'in-preparation',
        requestedAt: '2024-10-11T10:30:00Z',
        completedAt: null,
      },
      {
        orderId: '123457',
        dish: 'Chicken Salad',
        status: 'completed',
        requestedAt: '2024-10-11T10:00:00Z',
        completedAt: '2024-10-11T10:20:00Z',
      },
    ];
  
    if (status) {
      return orders.filter(order => order.status === status);
    }
    return orders;
  }

  getRecipes() {
    return [
      {
        recipeId: '1',
        name: 'Tomato Soup',
        ingredients: [
          { name: 'tomato', quantity: 2 },
          { name: 'onion', quantity: 1 },
          { name: 'cheese', quantity: 1 },
        ],
      },
      {
        recipeId: '2',
        name: 'Chicken Salad',
        ingredients: [
          { name: 'chicken', quantity: 1 },
          { name: 'lettuce', quantity: 2 },
          { name: 'lemon', quantity: 1 },
        ],
      },
      {
        recipeId: '3',
        name: 'Potato Stew',
        ingredients: [
          { name: 'potato', quantity: 3 },
          { name: 'onion', quantity: 1 },
          { name: 'ketchup', quantity: 1 },
        ],
      },
      {
        recipeId: '4',
        name: 'Grilled Meat',
        ingredients: [
          { name: 'meat', quantity: 1 },
          { name: 'lemon', quantity: 1 },
          { name: 'lettuce', quantity: 1 },
        ],
      },
      {
        recipeId: '5',
        name: 'Rice with Chicken',
        ingredients: [
          { name: 'rice', quantity: 2 },
          { name: 'chicken', quantity: 1 },
          { name: 'tomato', quantity: 1 },
        ],
      },
      {
        recipeId: '6',
        name: 'Cheese Salad',
        ingredients: [
          { name: 'cheese', quantity: 2 },
          { name: 'lettuce', quantity: 2 },
          { name: 'onion', quantity: 1 },
        ],
      },
    ];
  }
}
