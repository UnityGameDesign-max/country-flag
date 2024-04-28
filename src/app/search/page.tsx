"use client"

import { fetchCountries } from "@/api/countries";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ERROR_MESSAGE, cn } from "@/lib/utils";
import { Flag, Loader } from "lucide-react";
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
               if(errMsg === ERROR_MESSAGE){
                setCountries([]);
               }if(errMsg){
                toast.error(errMsg)
               }
            }finally{
                setIsLoading(false)
            }
        }

        fetchData();
    },[encodedSearchQuery]);

    return (
        <div className="py-10 flex justify-center flex-col items-center">
            
            {isLoading ? <Loader className='mt-2 text-center text-primary w-5 h-5 animate-spin' />: ''}

            <div className="mx-auto grid grid-cols-1 mt-10 sm:grid-cols-2 hl:grid-cols-1 gap-4 xl:grid-cols-2 px-5">
                {countries.length > 0 && countries.map((country: any, area: number) => (
                    <Card key={area} className="w-[335px] bg-slate-50 sm:w-[435px] my-3">
                        <CardContent className="py-6 flex justify-between">
                            <div>
                                <p className="font-semibold">{country.name.common}</p>
                                
                                {country.currencies && Object.values(country.currencies) ?  Object.values(country.currencies).map((item: any) => (
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm">{item.name}</p>
                                        
                                        {item.symbol ? <div className="bg-green-500/10 p-2 rounded-lg">
                                            <p className="text-green-500 text-sm">{item.symbol}</p>
                                        </div> : <p>unknown👎</p>}
                                        
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
                            />
                        </CardContent>
                    </Card>
                ))}
                </div>

                <div className="flex flex-col">
                    {countries.length === 0 && 
                        <div className="flex flex-col items-center">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <Flag className="w-20 h-20 text-primary"/>
                            </div>
                            <p className="mt-4 md:text-2xl font-semibold">No countries found for '{searchQuery}'</p>
                        
                        </div>
                    }

                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                            <PaginationPrevious 
                                className={
                                    cn('cursor-pointer', startIndex === 0 ? 'pointer-events-none opacity-50': undefined)
                                }
                                onClick={() => {
                                    setStartIndex(startIndex - rowsPerPage);
                                    setEndIndex(endIndex - rowsPerPage);
                                }}
                            />
                            </PaginationItem>
                            <PaginationItem>
                            <PaginationNext 
                                className={
                                    cn('cursor-pointer', endIndex === 100 ? 'pointer-events-none opacity-50': undefined)
                                }
                                onClick={() => {
                                    setStartIndex(startIndex + rowsPerPage)
                                    setEndIndex(endIndex + rowsPerPage)
                                }}
                            />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
          
        </div>
    )
}

export default Page;