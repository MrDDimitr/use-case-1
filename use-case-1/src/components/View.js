const View = ({ countries }) => (
    <div>
        <table>
            <thead>
                <tr>
                    <td>
                        Country name
                    </td>
                    <td>
                        Country population
                    </td>
                </tr>
            </thead>
            <tbody>
                {countries.map((country) => (
                    <tr key={`key-${country.name.common}`}>
                        <td>
                            {country.name.common}
                        </td>
                        <td>
                            {country.population}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)

export default View