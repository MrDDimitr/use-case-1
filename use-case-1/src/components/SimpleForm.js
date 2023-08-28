import { useState, useEffect } from "react"
import axios from "axios"

const SimpleForm = () => {
    const [countries, setCountries] = useState([])
    const [_, setFilteredCountries] = useState([])
    const [countryName, setCountryName] = useState("")

    const getCountries = () => {
        axios.get("https://restcountries.com/v3.1/all")
            .then((resp) => setCountries(resp.data))
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

    const handleOnCountryNameChange = (e) => {
        const { value } = e.target
        setCountryName(value)
        filterCoutries(value)
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
                <label htmlFor="">Name</label>
                <input type="text" />
            </section>
            <section>
                <label htmlFor="">Name</label>
                <input type="text" />
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