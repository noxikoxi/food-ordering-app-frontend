import {useAuth0} from "@auth0/auth0-react";
import {useLocation} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import LoadingButton from "@/components/LoadingButton.tsx";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog.tsx";
import UserProfileForm, {UserFormData} from "@/forms/user-profile-form/UserProfileForm.tsx";
import {useGetMyUser} from "@/api/MyUserApi.tsx";

type Props = {
    onCheckout: (userFormData: UserFormData) => void;
    disabled: boolean;
    isLoading: boolean;
}

const CheckoutButton = ({onCheckout, disabled, isLoading} : Props) => {

    const {isAuthenticated, isLoading: isAuthLoading, loginWithRedirect} = useAuth0();

    const {pathname} = useLocation();

    const {currentUser, isLoading: isGetUserLoading} = useGetMyUser();

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname,
            },
        })
    }

    if(!isAuthenticated){
        return <Button onClick={onLogin} className="bg-orange-500 flex-1">Log in to check out</Button>
    }

    if(isAuthLoading || !currentUser || isLoading){
        return <LoadingButton/>
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled} className="bg-orange-500 flex-1">Go to checkout</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
                <UserProfileForm
                    onSave={onCheckout}
                    isLoading={isGetUserLoading}
                    currentUser={currentUser}
                    title="Confirm Delivery Details"
                    buttonText="Continue to payment"
                />
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutButton;