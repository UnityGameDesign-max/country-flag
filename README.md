# This is a Country Flag API app


## How to set up and run the project

* run `npm install` to install necessary dependencies of the project
* run `npm run dev` to run the project locally on your machine

## How I Approached the problem

### Solution Approach
* The solution was crafted with a keen emphasis on scalability and maintainability. A structured file organization was embraced to streamline ongoing development efforts and accommodate potential future enhancements seamlessly. For the user interface, a clean and intuitive component library formed the backbone, augmented by Tailwind CSS for polished styling. Leveraging the RESTful API endpoint provided by https://restcountries.com/v3.1/name/{name}, the application fetches data efficiently, displaying all countries with a matching name while also presenting additional suggestions for further exploration

### Future Enhancements
* Potential future enhancements include implementing a feature for country suggestions as users type in the search field and caching previously submitted inputs to improve user experience.


### Learning Outcomes
* I learned a lot about fetching data from the server and the client side. All possible ways I could use to fetch data.


### Feedback on Assessment
* The assessment could be improved by specifying the recommended libraries for validation and form handling, as the use of any validation library was not mentioned and I decided to use react-hook-form and zod for validation. 