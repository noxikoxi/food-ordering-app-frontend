export type User = {
    _id: string;
    email: string;
    city: string;
    country: string;
    name: string;
    addressLine1: string;
}

export type MenuItem = {
    _id: string;
    name: string;
    price: number;
}

export type RestaurantSearchResponse = {
    data: Restaurant[],
    pagination: {
        total: number;
        page: number;
        pages: number;
    }
}

export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    menuItems: MenuItem[];
    imageUrl: string;
    lastUpdated: string;
}