import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import View from "./View"
import { filterByPopulation, paginate, sortByName } from "./manipulatingFunctions"

const SimpleForm = () => {
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [countryNameFilter, setCountryNameFilter] = useState("")
    const [population, setPopulation] = useState(1)
    const [sort, setSort] = useState("")
    const [pagLimit, setPagLimit] = useState(10)

    const getCountries = () => {
        axios.get("https://restcountries.com/v3.1/all")
            .then((resp) => {
                setCountries(resp.data)
                setFilteredCountries(resp.data)
            })
    }

    useEffect(() => {
        getCountries()
    }, [])

    const combineFunctionalities = useCallback(() => {
        const allCountries = countries
        const filteredByName = filteredCountries(countryNameFilter, allCountries)
        const filteredByPopulation = filterByPopulation(population, filteredByName)
        const sorted = sortByName(sort, filteredByPopulation)
        const paginated = paginate(pagLimit, sorted)
        setFilteredCountries(paginated)
    }, [countryNameFilter, population, sort, pagLimit, countries])


    const handleOnCountryNameChange = (e) => {
        const { value } = e.target
        setCountryNameFilter(value)
    }

    const handleOnPopulationChange = (e) => {
        const { value } = e.target
        setPopulation(value)
    }

    const handleOnSortChange = (e) => {
        const { value } = e.target
        setSort(value)
    }

    const handleOnLimitChange = (e) => {
        const { value } = e.target
        setPagLimit(value)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        combineFunctionalities()
    }

    return (
        <form action="" onSubmit={handleOnSubmit}>
            <section>
                <label htmlFor="">Country Name</label>
                <input 
                    type="text"
                    value={countryNameFilter}
                    onChange={handleOnCountryNameChange}
                />
            </section>
            <section>
                <label htmlFor="">Population</label>
                <input 
                    type="text"
                    value={population}
                    onChange={handleOnPopulationChange}
                />
            </section>
            <section>
                <label htmlFor="">Sort</label>
                <input 
                    type="text"
                    value={sort}
                    onChange={handleOnSortChange}
                />
            </section>
            <section>
                <label htmlFor="">Pagination limit</label>
                <input 
                    type="text"
                    value={pagLimit}
                    onChange={handleOnLimitChange}
                />
            </section>
            
            <button type="submit">Submit</button>

            <View countries={filteredCountries} />
        </form>
    )
}

export default SimpleForm