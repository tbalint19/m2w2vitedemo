// basic building blocks - algorithmic thinking
// (builtin method)

// browser js runtime I/O
// dom api
// fetch -> axios

import http from "axios";

/* const http = {
  get: async (url: string) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }
} */

let countries: Country[] | null = null

const getCountries = async () => {
  const response = await http.get("https://restcountries.com/v3.1/all");
  return response.data as Country[];
};

const init = async () => {
  const data = await getCountries();
  countries = data
};

init();

const input = document.getElementById("search-input") as HTMLInputElement
const button = document.getElementById("search-button") as HTMLButtonElement
const container = document.getElementById("countries") as HTMLDivElement

type Country = {
  name: {
    common: string
  }
}

const filter = (countries: Country[], searchParam: string) => {
  const search = searchParam.substring(0, 1).toLocaleUpperCase() + searchParam.substring(1)
  let result: Country[] = []
  for (let index = 0; index < countries.length; index++) {
    const country = countries[index];
    if (country.name.common.startsWith(search))
      result = [ ...result, country ]
  }
  return result
}

button.addEventListener("click", () => {  
  const userInput = input.value
  if (!countries)
    return alert("site not ready")
  const result = filter(countries, userInput)
  let content = ""

  for (let index = 0; index < result.length; index++) {
    const country = result[index];
    content += "<p>" + country.name.common + "</p>"
  }

  container.innerHTML = content

})

