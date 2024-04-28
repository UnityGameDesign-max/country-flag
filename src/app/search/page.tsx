"use client"

import { fetchCountries } from "@/api/countries";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {

    const rowsPerPage = 10;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [countries, setCountries] = useState([]);
    const [startIndex, setStartIndex] = useState<number>(0);
    const [endIndex, setEndIndex] = useState<number>(rowsPerPage);
    const search = useSearchParams();
    const searchQuery = search ? search.get("q") : null;
    const encodedSearchQuery = encodeURI(searchQuery || "");

    const joinAllCapitals = (capitals: string[]) => {
        return capitals.join(", ")
    }

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
            
            {isLoading ? <Loader className='mt-2 text-center text-primary w-5 h-5 animate-spin' />: ''}

            <div className="mx-auto grid grid-cols-1 mt-10 sm:grid-cols-2  gap-4 md:gap-6 lg:gap-8 xl:grid-cols-2 px-5">
            {countries.length > 0 && countries.slice(startIndex, endIndex).map((country: any, area: number) => (
                <Card key={area} className="w-[335px] bg-slate-50 sm:w-[435px] my-3">
                    <CardContent className="py-6 flex justify-between">
                        <div>
                            <p className="font-semibold">{country.name.common}</p>
                            
                            {country.currencies && Object.values(country.currencies) ?  Object.values(country.currencies).map((item: any) => (
                                <div className="flex items-center gap-2">
                                    <p className="text-sm">{item.name}</p>
                                    
                                    <div className="bg-green-500/10 p-2 rounded-lg">
                                        <p className="text-green-500 text-sm">{item.symbol}</p>
                                    </div>
                                </div>
                            )) : <p className="text-muted-foreground text-sm">🤷‍♀️</p>}
                            <p className="text-sm text-muted-foreground">{country.capital ? joinAllCapitals(country.capital) : <p>💁</p>}</p>
                        </div>
                       
                        <Image 
                            src={country.flags.png}
                            alt="flag"
                            width={100}
                            height={100}
                            objectFit="cover"
                            quality={100}
                        />
                    </CardContent>
                </Card>
            ))}

            </div>
          
        </div>
    )
}

export default Page;