'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchCountryValidator, TSearchCountryValidator } from "@/lib/validators/search-validator";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchIcon } from 'lucide-react';
import { useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";



const SearchInput = () => {

    const router = useRouter();
    const onSearch = (data: TSearchCountryValidator) => {
    
      const encodedSearchQuery = encodeURI(data.search);
      router.push(`/search?q=${encodedSearchQuery}`);
    }

    const form = useForm<TSearchCountryValidator>({
        resolver: zodResolver(SearchCountryValidator),
        defaultValues: {
            search: ''
        },
        mode: 'onSubmit'
    })

    return (
        <div className="mt-14">
            
            <p className="text-sm font-semibold mb-3 self-center">Search with country name</p>
            <div className="flex gap-3">
                <Form {...form}>
                    <form className="flex gap-2" onSubmit={form.handleSubmit(onSearch)}>
                        <div>
                            <FormField 
                                control={form.control}
                                name="search"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                        <Input
                                            icon={<SearchIcon className="h-4 w-4"/>}
                                            placeholder="What country are looking for..."
                                            className="w-70"
                                            {...field}
                                        />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit">Search</Button>
                    </form>
                </Form>
            </div>
            
        </div>
    )
}

export default SearchInput;