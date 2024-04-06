import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";
import DetailsSection from "@/forms/manage-restaurant-form/DetailsSection.tsx";
import {Separator} from "@radix-ui/react-separator";
import CuisinesSection from "@/forms/manage-restaurant-form/CuisinesSection.tsx";
import MenuSection from "@/forms/manage-restaurant-form/MenuSection.tsx";
import ImageSection from "@/forms/manage-restaurant-form/ImageSection.tsx";
import LoadingButton from "@/components/LoadingButton.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Restaurant} from "@/types.ts";
import {useEffect} from "react";

const formSchema = z.object({
    restaurantName: z.string().min(1, "restaurant name is required"),
    city: z.string().min(1, "city name is required"),
    country: z.string().min(1, "country name is required"),
    // coerce converts from string to number
    deliveryPrice: z.coerce.number().positive("required a non negative number"),
    estimatedDeliveryTime: z.coerce.number().positive("required a non negative number"),
    cuisines: z.array(z.string()).nonempty({message: "required at least one cuisine"}),
    menuItems: z.array(z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required")
        })
    ),
    imageFile: z.instanceof(File, {message: "image is required"}).optional(),
    imageUrl: z.string().optional()

}).refine( (data) => data.imageUrl || data.imageFile, {message: "Either image URL or image File must be provided"});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
    restaurant?: Restaurant;
};

const ManageRestaurantForm = ({restaurant, onSave, isLoading} : Props) => {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0}],
            restaurantName: "",
            city: '',
            country: '',
            deliveryPrice: 1.50,
            estimatedDeliveryTime: 30
        },
    })

    useEffect(() => {
        if(!restaurant){
            return;
        }else{
            const deliveryPriceFormatted = parseInt((restaurant.deliveryPrice / 100).toFixed(2));

            const menuItemsFormatted = restaurant.menuItems.map((item) => ({
                ...item,
                price: parseInt((item.price / 100).toFixed(2)),
            }));

            const updateRestaurant = {
                ...restaurant,
                deliveryPrice: deliveryPriceFormatted,
                menuItems: menuItemsFormatted
            };

            form.reset(updateRestaurant);
        }
    }, [form, restaurant]);

    const onSubmit = (formDataJson: RestaurantFormData) => {
        const formData = new FormData();

        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);


        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString());
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());

        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine);
        });
        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name);
            formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString());
        });

        if(formDataJson.imageFile) {
            formData.append(`imageFile`, formDataJson.imageFile);
        }

        onSave(formData);
    };

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
                <DetailsSection />
                <Separator/>
                <CuisinesSection/>
                <Separator/>
                <MenuSection/>
                <Separator/>
                <ImageSection/>
                {isLoading ? <LoadingButton/> : <Button type="submit"> Submit </Button>}
            </form>
        </Form>
    )


};

export default ManageRestaurantForm;