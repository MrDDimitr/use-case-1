import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import View from "./View"

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

    const filterCoutries = (newCountryName, countriesToFilter) => {
        const filtered = countriesToFilter.filter((country) => (
            country.name.common.toLowerCase().includes(newCountryName.toLowerCase())
        ))
        return filtered
    }

    const filterByPopulation = (newPopulation, countriesToFilter) => {
        const valueInMill = newPopulation * 1000000
        const filtered = countriesToFilter.filter((country) => (
            country.population < valueInMill
        ))
        return filtered
    }

    const sortByName = (sortValue, countiesToSort) => {
        let sorted
        if (sortValue === "ascend") {
            sorted = countiesToSort.sort((a, b) => a.name.common.localeCompare(b.name.common))
        } else if (sortValue === "descend") {
            sorted = countiesToSort.sort((a, b) => b.name.common.localeCompare(a.name.common))
        } else {
            sorted = countiesToSort
        }
        return sorted
    }

    const paginate = (paginateNum, countriesToPaginate) => {
        const newPaginatedState = countriesToPaginate.slice(0, paginateNum)
        return newPaginatedState
    }

    const combineFunctionalities = useCallback(() => {
        const allCountries = countries
        const filteredByName = filterCoutries(countryNameFilter, allCountries)
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