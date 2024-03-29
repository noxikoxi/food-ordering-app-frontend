import UserProfileForm from "@/forms/user-profile-form/UserProfileForm.tsx";
import {useGetMyUser, useUpdateMyUser} from "@/api/MyUserApi.tsx";
import {useEffect} from "react";

const UserProfilePage = () => {

    useEffect( () => {
        document.title = 'User Profile';
    }, []);

    const {updateUser, isLoading: isUpdateLoading} = useUpdateMyUser();
    const {currentUser, isLoading: isGetLoading} = useGetMyUser();

    if(isGetLoading){
        return <span>Loading...</span>;
    }

    if(!currentUser){
        return <span>Unable to load user profile</span>;
    }

    return (
         <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading}/>
    )
};

export default UserProfilePage;