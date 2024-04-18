import {Restaurant} from "@/types.ts";
import {CartItem} from "@/pages/DetailPage.tsx";
import {CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Trash} from "lucide-react";

type Props = {
    restaurant: Restaurant;
    cartItems: CartItem[];
    removeFromCart: (cartitem: CartItem) => void;
};

const OrderSummary = ({restaurant, cartItems, removeFromCart} : Props) => {

    const getTotalCost = () => {
        const totalCost = cartItems.reduce((total, cardItem) => total + cardItem.price * cardItem.quantity, 0);
        const totalDelivery = totalCost + restaurant.deliveryPrice;

        return (totalDelivery / 100).toFixed(2);
    }

    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
                    <span>Your Order</span>
                    <span>{getTotalCost()}$</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between">
                        <span>
                            <Badge variant="outline" className="mr-2">
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Trash className="cursor-pointer" color={"red"} onClick={() => removeFromCart(item)}/>
                            {((item.price * item.quantity) / 100).toFixed(2)}$
                        </span>
                    </div>
                ))}
                <Separator/>
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>{(restaurant.deliveryPrice / 100).toFixed(2)}$</span>

                </div>
                <Separator/>
            </CardContent>
        </>
    );
};



export default OrderSummary;