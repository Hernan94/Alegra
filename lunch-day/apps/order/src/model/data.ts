export interface Ingredient {
    name: string;
    quantity: number;
  }

  export interface Recipe {
    recipeId: string;
    name: string;
    ingredients: Ingredient[];
  }

  export interface Order {
    orderId: string;
    dish: string;
    status: string;
    requestedAt: string;
    completedAt: string | null; 
  }