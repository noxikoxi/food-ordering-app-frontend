import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";

type Props = {
    onChange: (value: string) => void;
    sortOption: string;
}

const SORT_OPTIONS = [
    {
        label: "Best match",
        value: "bestmatch"
    },
    {
        label: "Delivery Price",
        value: "deliveryPrice"
    },
    {
        label: "Estimated Delivery Time",
        value: "estimatedDeliveryTime"
    },
]

const SortOptionDropdown = ({onChange, sortOption} : Props) => {

    const selectedSortLabel = SORT_OPTIONS.find(
        (option) => option.value === sortOption)?.label || SORT_OPTIONS[0].label;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
                    <Button variant="outline">
                        Sort By: {selectedSortLabel}
                    </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {SORT_OPTIONS.map((option, index) => (
                    <DropdownMenuItem
                        key={index}
                        className="cursor-pointer"
                        onClick={() => onChange(option.value)}
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>

        </DropdownMenu>
    );
};

export default SortOptionDropdown;