import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly dishes = [
    { name: 'Tomato Soup', ingredients: [{ name: 'tomato', quantity: 2 }] },
    { name: 'Chicken Salad', ingredients: [{ name: 'chicken', quantity: 1 }, { name: 'lettuce', quantity: 1 }] },
    { name: 'Cheese Pizza', ingredients: [{ name: 'cheese', quantity: 3 }, { name: 'tomato', quantity: 1 }] }
    // Agrega las demás recetas aquí...
  ];

  constructor(private readonly httpService: HttpService) {}

  // Seleccionar un plato aleatoriamente
  selectRandomDish() {
    const randomIndex = Math.floor(Math.random() * this.dishes.length);
    return this.dishes[randomIndex];
  }

  // Solicitar ingredientes al microservicio de bodega
  async requestIngredients(dish: any): Promise<boolean> {
    try {
      const response = await this.httpService.post('http://bodega-service/request-ingredients', { ingredients: dish.ingredients }).toPromise();
      return response.data.success; // Asume que la respuesta contiene un campo 'success'
    } catch (error) {
      console.error('Error requesting ingredients:', error);
      return false;
    }
  }

  // Simula la preparación del plato
  prepareDish(dish: any) {
    console.log(`Preparing dish: ${dish.name}`);
    // Lógica para preparar el plato...
  }
}
