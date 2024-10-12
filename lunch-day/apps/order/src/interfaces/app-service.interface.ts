import { Recipe, Order } from "src/model/data";

export interface IAppService {
  selectRandomDish(): Recipe;
  getOrdersByStatus(status: string): Order[];
  getRecipes(): Recipe[];
  }