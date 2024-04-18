import {MenuItem} from "@/types.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";

type Props = {
    menuItem: MenuItem;
    addToCart: () => void;
};

const MenuItemCard = ({menuItem, addToCart} : Props) => {
    return (
        <Card className="cursor-pointer" onClick={addToCart}>
            <CardHeader>
                <CardTitle>
                    {menuItem.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="font-bold">
                {(menuItem.price / 100).toFixed(2) }$
            </CardContent>
        </Card>
    );
};

export default MenuItemCard;
