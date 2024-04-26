"use client"

import { fetchCountries } from "@/api/countries";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";
import Image from "next/image";
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
                <Card key={index} className="w-[335px] sm:w-[435px] my-3">
                    <CardContent className="py-6 flex justify-between">
                        <div>
                            <p className="font-semibold">{country.name.common}</p>
                            
                            {Object.values(country.currencies) ?  Object.values(country.currencies).map((item: any) => (
                                <div className="flex items-center gap-2">
                                    <p className="text-sm">{item.name}</p>
                                    <div className="bg-green-500/10 p-1 rounded-full">
                                        <p className="text-green-500 text-1xl">{item.symbol}</p>
                                    </div>
                                </div>
                            )) : ''}
                            <p className="text-sm text-muted-foreground">{country.capital.join(', ')}</p>
                        </div>
                       
                        <Image 
                            src={country.flags.png}
                            alt="flag"
                            width={100}
                            height={100}
                            quality={100}
                        />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default Page;