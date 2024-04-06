import { useFormContext} from "react-hook-form";
import {FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {cuisineList} from "@/config/restaurant-options-config.ts";
import CuisineCheckBox from "@/forms/manage-restaurant-form/CuisineCheckbox.tsx";

const CuisinesSection = () => {
    const {control} = useFormContext();

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold"> Cuisines </h2>
                <FormDescription>
                    Select the cuisines that your restaurant serves
                </FormDescription>
            </div>
            <FormField
                control={control}
                name="cuisines"
                render={({field}) => (
                    <FormItem>
                        <div className="grid md:grid-cols-5 gap-1">
                            {cuisineList.map((cuisineItem, index) => (
                                // div with key prevents react warning that each child needs an key prop
                                <div key={index}>
                                    <CuisineCheckBox cuisine={cuisineItem} field={field}/>
                                </div>
                                ))
                            }
                        </div>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>

    );
};

export default CuisinesSection;