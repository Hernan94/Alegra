import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly ingredientsStock = {
    tomato: 5,
    chicken: 5,
    lettuce: 5,
    cheese: 5,
    onion: 5,
    lemon: 5,
    potato: 5,
    rice: 5,
    ketchup: 5,
    meat: 5
  };

  constructor(private readonly httpService: HttpService) {}

  // Verifica si los ingredientes solicitados están disponibles en la bodega
  async checkIngredients(ingredients: any[]): Promise<boolean> {
    for (const ingredient of ingredients) {
      if (this.ingredientsStock[ingredient.name] < ingredient.quantity) {
        return false;
      }
    }
    return true;
  }

  // Reduce los ingredientes de la bodega
  reduceIngredients(ingredients: any[]) {
    ingredients.forEach(ingredient => {
      this.ingredientsStock[ingredient.name] -= ingredient.quantity;
    });
  }

  // Rellena los ingredientes si no están disponibles en la bodega
  async restockIngredients(ingredients: any[]): Promise<any> {
    const restockResults = [];

    for (const ingredient of ingredients) {
      // Si el ingrediente no está disponible en la bodega, intenta comprarlo en la plaza de mercado
      if (this.ingredientsStock[ingredient.name] < ingredient.quantity) {
        const result = await this.buyFromMarket(ingredient.name);
        restockResults.push(result);

        // Si se compraron ingredientes, actualiza el stock
        if (result.quantityBought > 0) {
          this.ingredientsStock[ingredient.name] += result.quantityBought;
        }
      }
    }

    return restockResults;
  }

  // Compra ingredientes de la plaza de mercado
  async buyFromMarket(ingredientName: string): Promise<any> {
    try {
      const response = await this.httpService
        .post('https://recruitment.alegra.com/api/farmers-market/buy', {
          ingredient: ingredientName
        })
        .toPromise();

      const { quantitySold } = response.data;

      if (quantitySold > 0) {
        return {
          success: true,
          message: `Successfully bought ${quantitySold} of ${ingredientName}`,
          ingredient: ingredientName,
          quantityBought: quantitySold
        };
      } else {
        return {
          success: false,
          message: `Ingredient ${ingredientName} is not available in the market.`,
          ingredient: ingredientName,
          quantityBought: 0
        };
      }
    } catch (error) {
      console.error(`Error buying ${ingredientName} from the market:`, error);
      return {
        success: false,
        message: `Error buying ${ingredientName} from the market.`,
        ingredient: ingredientName,
        quantityBought: 0
      };
    }
  }
}
