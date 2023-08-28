import { useState, useEffect } from "react"
import axios from "axios"

const SimpleForm = () => {
    const [countries, setCountries] = useState([])

    const getCountries = () => {
        axios.get("https://restcountries.com/v3.1/all")
            .then((resp) => setCountries(resp.data))
    }

    useEffect(() => {
        getCountries()
    }, [])

    return (
        <form action="">
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <button type="submit">Submit</button>
        </form>
    )
}

export default SimpleForm