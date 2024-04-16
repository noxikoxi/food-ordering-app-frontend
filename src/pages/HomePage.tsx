import landingImage from "../assets/landing.png";
import appImage from "../assets/appDownload.png";
import {useEffect} from "react";
import SearchBar, {searchForm} from "@/components/SearchBar.tsx";
import {useNavigate} from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();

    const handleSearchSubmit = (searchFormValues: searchForm) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`,
        })
    }

    useEffect( () => {
        document.title = 'MernEats';
    }, []);

    return (
        <div className="flex flex-col gap-12">
            <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold tracking-tight text-orange-600">
                    Tuck into a takeaway today
                </h1>
                <span className="text-xl"> Food is just a click away! </span>
                <SearchBar onSubmit={handleSearchSubmit} placeHolder="Search by City or Town" searchQuery=""/>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage}  alt="preview"/>
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tight"> Order takeaway even faster! </span>
                    <span> Download the MernEats App for faster ordering and personalised recommendation</span>
                    <img src={appImage} alt="download_links" />
                </div>
            </div>
        </div>
    )
}

export default HomePage;