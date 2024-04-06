import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm.tsx";
import {useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant} from "@/api/MyRestaurantApi.tsx";
import {useEffect} from "react";

const ManageRestaurantPage = () => {

    useEffect( () => {
        document.title = 'My Restaurant';
    }, []);

    const {createRestaurant, isLoading: isCreateLoading} = useCreateMyRestaurant();
    const {restaurant} = useGetMyRestaurant();
    const {updateRestaurant, isLoading : isUpdateLoading} = useUpdateMyRestaurant();

    const isEditing = !!restaurant;

    return (
        <ManageRestaurantForm restaurant={restaurant} onSave={isEditing ? updateRestaurant : createRestaurant} isLoading={isCreateLoading || isUpdateLoading}/>
    )
}

export default ManageRestaurantPage;