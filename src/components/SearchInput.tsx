'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchCountryValidator, TSearchCountryValidator } from "@/lib/validators/search-validator";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchIcon } from 'lucide-react';
import { useRouter } from "next/navigation";
import { fetchCountries } from "@/api/countries";
import { Card, CardContent } from "./ui/card";
//import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";


const SearchInput = () => {

    const [searchQuery, setSearchQuery] = useState<string>('');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [suggestedCountries, setSuggestedCountries] = useState([]);
    const [err, setErr] = useState('');
  
    const onSearch = () => {

      const encodedSearchQuery = encodeURI(searchQuery);
      router.push(`/search?q=${encodedSearchQuery}`);
    }

    useEffect(() => {
        async function getSuggestedCountries(){
            setIsLoading(true);
            try{
                const suggestedCountry = await fetchCountries(searchQuery);
                setSuggestedCountries(suggestedCountry);
            }catch(err: any){
                console.error(err)
                setErr(err.message)
            }finally{
                setIsLoading(false)
            }
        }

        getSuggestedCountries()
    },[searchQuery])
  
    const {
      register, 
      handleSubmit, 
      formState: { errors } 
    } = useForm<TSearchCountryValidator>({
      resolver: zodResolver(SearchCountryValidator)
    })

    return (
        <div className="mt-14">
            
            <p className="text-sm font-semibold mb-3 self-center">Search with country name</p>
            <div className="flex gap-3">
                <form className="flex gap-2" onSubmit={handleSubmit(onSearch)}>
                <div>
                    <Input
                    icon={<SearchIcon className="h-4 w-4"/>}
                    {...register('search')}
                    placeholder="What country are looking for..."
                    className={cn({
                        'focus-visible:ring-red-500': errors.search
                        }, 'w-[250px] sm:w-[350px]')}
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    />
                    <p className="text-red-500 mt-1 text-sm">{errors.search?.message}</p>
                </div>
                
                <Button type="submit">Search</Button>
                </form>
            </div>
           

           { isLoading && searchQuery ? 
            <Card className="w-[335px] sm:w-[435px] mt-1">
                <CardContent className="py-4">
                    Loading...
                </CardContent>
            </Card> 
            : ''
            }
            {
                !isLoading && searchQuery ? 
                <Card className="w-[335px] h-[300px] sm:w-[435px] mt-1">
                    <CardContent className="py-2 overflow-y-auto max-h-[300px]">
                        <ul className="py-2">
                            {suggestedCountries.map((country: any) => (
                                <li className= "block cursor-pointer select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                    <div className="text-sm font-semibold leading-none">{country.name.common}</div>
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        currency
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                :
                ''
            }
            
        </div>
    )
}

export default SearchInput;