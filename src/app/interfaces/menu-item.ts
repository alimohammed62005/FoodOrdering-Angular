export interface MenuItem {
  id: number;
  itemName: string;
  description: string;
  price: number;
  restaurantId: number;
  quantity?: number;
  imageUrl: string;
}
