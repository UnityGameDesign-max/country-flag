export async function fetchCountries(encodedSearchQuery: string): Promise<any>{
    try{
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodedSearchQuery}`);
        const data = await response.json();
        if(!response.ok){
            throw new Error('No Country found')
        }
        return data
    }catch(err: any){
        throw err;
    }
}