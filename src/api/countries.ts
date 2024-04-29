import { COUNTRY_FLAG_API_ENDPOINT } from "@/lib/config";
import { COUNTRY_NOT_REACH } from "@/lib/utils";

export async function fetchCountries(encodedSearchQuery: string): Promise<any>{

    try{
        const response = await fetch(`${COUNTRY_FLAG_API_ENDPOINT}/${encodedSearchQuery}?fullText=true`);
        const data = await response.json();
        if(data.status){
            throw new Error(COUNTRY_NOT_REACH);
        }
        if(data._links){
            throw new Error(data.message)
        }
        console.log(data)
        return data;
    }catch(err: any){
        throw err;
    }
}