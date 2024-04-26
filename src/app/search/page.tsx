"use client"

import { fetchCountries } from "@/api/countries";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [countries, setCountries] = useState([]);

    const search = useSearchParams();
    const searchQuery = search ? search.get("q") : null;

    const encodedSearchQuery = encodeURI(searchQuery || "");

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
               const countryRes = await fetchCountries(encodedSearchQuery);
               setCountries(countryRes);
               console.log(countryRes);
            } catch (err: any) {
               const errMsg = err.message;
               if(errMsg){
                toast.error(errMsg)
               }
            }finally{
                setIsLoading(false)
            }
        }

        fetchData();
    },[encodedSearchQuery]);

    return (
        <div className="">
            
            {isLoading ? <Loader className='mt-2 text-primary w-5 h-5 animate-spin' />: ''}

            {countries.map((country: any, index) => (
                <p>{country.name.common}</p>
            ))}
        </div>
    )
}

export default Page;