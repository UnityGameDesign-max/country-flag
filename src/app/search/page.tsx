"use client"

import { fetchCountries } from "@/api/countries";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { API_NOT_REACH, COUNTRY_NOT_REACH, cn } from "@/lib/utils";
import { Flag, Loader, Unplug } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

const Page = () => {

    const rowsPerPage = 10;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [countries, setCountries] = useState([]);
    const [startIndex, setStartIndex] = useState<number>(0);
    const [endIndex, setEndIndex] = useState<number>(rowsPerPage);
    const search = useSearchParams();
    const [apiFail, setAPIFail] = useState<string>('');
    const searchQuery = search ? search.get("q") : null;
    const encodedSearchQuery = encodeURI(searchQuery || "");

    const joinAllCapitals = (capitals: string[]) => {
        return capitals.join(", ");
    }


    const handleError = (errMsg: string) => {
        switch (errMsg) {
            case API_NOT_REACH:
                setAPIFail(API_NOT_REACH);
            break;
            case COUNTRY_NOT_REACH:
                setCountries([]);
                setAPIFail('');
            break;
        }
    };

    const searchQueryRef = useRef(encodedSearchQuery);

    useEffect(() => {

        if (searchQueryRef.current !== encodedSearchQuery) {
            setStartIndex(0);
            setEndIndex(rowsPerPage);
            searchQueryRef.current = encodedSearchQuery;
        }
        
        async function fetchData() {
            setIsLoading(true);
            try {
               const countryRes = await fetchCountries(encodedSearchQuery);
               setCountries(countryRes);
            } catch (err: any) {
               const errMsg = err.message;
               handleError(errMsg)
            }finally{
                setIsLoading(false)
            }
        }

        fetchData();
    },[encodedSearchQuery]);


    const handlePrevious = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - rowsPerPage);
            setEndIndex(endIndex - rowsPerPage);
        }
    };

    const handleNext = () => {
        if (endIndex < countries.length) {
            setStartIndex(startIndex + rowsPerPage);
            setEndIndex(endIndex + rowsPerPage);
        }
    };
   

    const currentPageCountries = countries.slice(startIndex, endIndex);

    return (
        
        <div className="py-10 flex justify-center flex-col items-center">
            
            {isLoading ? <Loader className='mt-2 text-center text-primary w-5 h-5 animate-spin' />: ''}

            
            <div className="mx-auto grid grid-cols-1 mt-10 sm:grid-cols-2 hl:grid-cols-1 gap-4 xl:grid-cols-2 px-5">

            
                {currentPageCountries.length > 0 && currentPageCountries.map((country: any) => (
                        <Card key={country.cca2} className="w-[335px] bg-slate-50 sm:w-[435px] my-3">
                            <CardContent className="py-6 flex justify-between">
                                <div key={country.area}>
                                    <p className="font-semibold">{country.name.common}</p>
                                    
                                    {country.currencies && Object.values(country.currencies) ?  Object.values(country.currencies).map((item: any, index: number) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <p className="text-sm">{item.name}</p>
                                            
                                            {item.symbol ? <div className="bg-green-500/10 p-2 rounded-lg">
                                                <p className="text-green-500 text-sm">{item.symbol}</p>
                                            </div> : <p className="text-sm">👎unknown</p>}
                                            
                                        </div>
                                    )) : <p className="text-muted-foreground text-sm">unknown 🤷‍♀️</p>}
                                    <p className="text-sm text-muted-foreground">{country.capital ? joinAllCapitals(country.capital) : <p>unknown ❌</p>}</p>
                                </div>
                            
                                <Image 
                                    src={country.flags.png}
                                    alt="flag"
                                    width={100}
                                    height={100}
                                    quality={100}
                                    objectFit="contain"
                                />
                            </CardContent>
                        </Card>
                    ))}
                
            
                
                </div>

                <div className="flex flex-col">
                    {countries.length === 0 && !isLoading && 
                        <div className="flex flex-col items-center">
                            {apiFail ? 
                                <div className="bg-red-500/10 p-2 rounded-lg">
                                    <Unplug className='w-20 h-20 text-red-500' />
                                </div>
                                :
                                <div className="bg-primary/10 p-2 rounded-lg">
                                    <Flag className="w-20 h-20 text-primary"/>
                                </div>
                            }
                            {apiFail ? <p className="mt-4 md:text-2xl font-semibold">There is a technical issue. Please try again later.</p> :  <p className="mt-4 md:text-2xl font-semibold">No countries found for {`'${searchQuery}'`}</p>}
                        
                        </div>
                    }


                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                            <PaginationPrevious 
                                className={
                                    cn('cursor-pointer', startIndex === 0 ? 'pointer-events-none opacity-50': undefined)
                                }
                                onClick={handlePrevious}
                            />
                            </PaginationItem>
                            <PaginationItem>
                            <PaginationNext 
                                className={
                                    cn('cursor-pointer', endIndex >= countries.length ? 'pointer-events-none opacity-50': undefined)
                                }
                                onClick={handleNext}
                            />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
        </div>
       
    )
}

export default Page;