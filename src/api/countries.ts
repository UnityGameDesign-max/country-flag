import { ERROR_MESSAGE } from "@/lib/utils";

export async function fetchCountries(encodedSearchQuery: string): Promise<any>{
    try{
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodedSearchQuery}`);
        const data = await response.json();
        if(!response.ok){
            throw new Error(ERROR_MESSAGE)
        }
        return data
    }catch(err: any){
        throw err;
    }
}