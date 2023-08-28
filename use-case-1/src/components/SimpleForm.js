import { useState, useEffect } from "react"
import axios from "axios"

const SimpleForm = () => {
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [countryName, setCountryName] = useState("")
    const [population, setPopulation] = useState(0)
    const [sort, setSort] = useState("")

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

    const filterCoutries = (newCountryName) => {
        const filtered = countries.filter((country) => (
            country.name.common.toLowerCase().includes(newCountryName.toLowerCase())
        ))
        setFilteredCountries(filtered)
    }

    const filterByPopulation = (newPopulation) => {
        const valueInMill = newPopulation * 1000000
        const filtered = countries.filter((country) => (
            country.population < valueInMill
        ))
        setFilteredCountries(filtered)
    }

    const sortByName = (sortValue) => {
        if (sortValue === "ascend") {
            const sorted = filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common))
            setFilteredCountries(sorted)
        } else if (sortValue === "descend") {
            const sorted = filteredCountries.sort((a, b) => b.name.common.localeCompare(a.name.common))
            setFilteredCountries(sorted)
        }
    }

    const handleOnCountryNameChange = (e) => {
        const { value } = e.target
        setCountryName(value)
        filterCoutries(value)
    }

    const handleOnPopulationChange = (e) => {
        const { value } = e.target
        setPopulation(value)
        const numberValue = parseInt(value)
        filterByPopulation(numberValue)
    }

    const handleOnSortChange = (e) => {
        const { value } = e.target
        setSort(value)
        sortByName(value)
    }

    return (
        <form action="">
            <section>
                <label htmlFor="">Country Name</label>
                <input 
                    type="text"
                    value={countryName}
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
                <label htmlFor="">Name</label>
                <input type="text" />
            </section>
            
            <button type="submit">Submit</button>
        </form>
    )
}

export default SimpleForm