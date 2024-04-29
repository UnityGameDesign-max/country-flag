import { COUNTRY_FLAG_API_ENDPOINT } from "@/lib/config";
import { ERROR_MESSAGE } from "@/lib/utils";

export async function fetchCountries(encodedSearchQuery: string): Promise<any>{

    try{
        const response = await fetch(`${COUNTRY_FLAG_API_ENDPOINT}/${encodedSearchQuery}?fullText=true`);
        const data = await response.json();
        if(!response.ok){
            throw new Error(ERROR_MESSAGE);
        }
        return data;
    }catch(err: any){
        throw err;
    }
}