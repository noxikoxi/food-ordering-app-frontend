import {useParams} from "react-router-dom";
import {useGetRestaurant} from "@/api/RestaurantApi.tsx";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";
import RestaurantInfo from "@/components/RestaurantInfo.tsx";
import MenuItemCard from "@/components/MenuItemCard.tsx";
import {useState} from "react";
import OrderSummary from "@/components/OrderSummary.tsx";
import {MenuItem} from "@/types.ts";
import {Card, CardFooter} from "@/components/ui/card.tsx";
import CheckoutButton from "@/components/CheckoutButton.tsx";
import {UserFormData} from "@/forms/user-profile-form/UserProfileForm.tsx";
import {useCreateCheckoutSession} from "@/api/OrderApi.tsx";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
};

const DetailPage = () => {

    const {restaurantId} = useParams();
    const {restaurant, isLoading} = useGetRestaurant(restaurantId);
    const {createCheckoutSession, isLoading: isCheckoutLoading} = useCreateCheckoutSession();

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCardItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
        return storedCardItems ? JSON.parse(storedCardItems) : [];
    });

    const addToCart = (menuItem: MenuItem) => {
        setCartItems((prevCartItems) => {

            const existingCartItem = prevCartItems.find(
                (cartItem) => cartItem._id === menuItem._id);

            let updatedCartItems;

            if(existingCartItem){
                updatedCartItems = prevCartItems.map((cartItem) =>
                    cartItem._id === menuItem._id
                        ? {...cartItem, quantity : cartItem.quantity+1 }
                        : cartItem
                );
            }else{
                updatedCartItems = [
                    ...prevCartItems,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1,
                    }
                ]
            }

            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        })

    };

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCardItems) => {
            const updatedCartItems =  prevCardItems.filter((item) => cartItem._id !== item._id);

            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        })
    }

    const onCheckout = async (userFormData: UserFormData) => {
        if(!restaurant){
            return;
        }

        const checkoutData = {
            cartItems: cartItems.map((item) => ({
                menuItemId: item._id,
                name: item.name,
                quantity: item.quantity.toString(),
            })),
            restaurantId: restaurant._id,
            deliveryDetails: {
                name: userFormData.name,
                addressLine1: userFormData.addressLine1,
                city: userFormData.city,
                country: userFormData.country,
                email: userFormData.email as string
            }
        };

        const data = await createCheckoutSession(checkoutData);
        window.location.href = data.url;
    };

    if(isLoading || !restaurant){
        return <span>Loading...</span>
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16/5}>
                <img alt="restaurant image" src={restaurant.imageUrl} className="rounded-md object-cover h-full w-full"/>

            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((item, index) => (
                        <MenuItemCard key={index} menuItem={item} addToCart={() => addToCart(item)}/>
                    ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart}/>
                        <CardFooter>
                            <CheckoutButton
                                disabled={cartItems.length === 0}
                                onCheckout={onCheckout}
                                isLoading={isCheckoutLoading}
                            />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;