'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchCountryValidator, TSearchCountryValidator } from "@/lib/validators/search-validator";
import { Flag, SearchIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

export default function Home() {

  const [searchQuery, setSearchQuery] = useState<string>('');

  const onSearch = () => {
    console.log('Search')
    const encodedSearchQuery = encodeURI(searchQuery);
  }

  const {
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<TSearchCountryValidator>({
    resolver: zodResolver(SearchCountryValidator)
  })

  return (
    <>
    
      <nav className="sticky h-14 insert-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
        <div className="max-auto w-full px-2.5 md:px-20">
          <div className="flex h-14 items-center gap-1 border-b border-zinc-200">
            <Flag className="h-4 w-4 text-primary"/>
            <h1 className="text-lg font-semibold">Search</h1>
          </div>
        </div>
      </nav>

      <div className="flex flex-col items-center mt-14">
        <div>
          <p className="text-sm font-semibold mb-3 self-center">Search with country name</p>
          <div className="flex gap-3">
            <form className="flex gap-1" onSubmit={handleSubmit(onSearch)}>
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
               <p className="text-red-500 text-sm">{errors.search?.message}</p>
              </div>
              
              <Button type="submit">Search</Button>
            </form>
            
          </div>
        </div>
      </div>

    </>
  );
}
