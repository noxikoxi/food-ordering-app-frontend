import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm.tsx";
import {
    useCreateMyRestaurant,
    useGetMyRestaurant,
    useGetMyRestaurantOrders,
    useUpdateMyRestaurant
} from "@/api/MyRestaurantApi.tsx";
import {useEffect} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import OrderItemCard from "@/components/OrderItemCard.tsx";

const ManageRestaurantPage = () => {

    useEffect( () => {
        document.title = 'My Restaurant';
    }, []);

    const {createRestaurant, isLoading: isCreateLoading} = useCreateMyRestaurant();
    const {restaurant} = useGetMyRestaurant();
    const {updateRestaurant, isLoading : isUpdateLoading} = useUpdateMyRestaurant();
    const {orders} = useGetMyRestaurantOrders();

    const isEditing = !!restaurant;

    return (
        <Tabs defaultValue="orders">
            <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="space-y-5 bg-gray-50 p-10 rounded-lg">
                <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>

                {orders?.map((order, index) => (
                    <OrderItemCard order={order} key={index} />
                ))}
            </TabsContent>
            <TabsContent value="manage-restaurant">
                <ManageRestaurantForm
                     restaurant={restaurant}
                     onSave={isEditing ? updateRestaurant : createRestaurant}
                     isLoading={isCreateLoading || isUpdateLoading}
                 />
            </TabsContent>

        </Tabs>
    )
}

export default ManageRestaurantPage;