export const filterCoutries = (newCountryName, countriesToFilter) => {
    const filtered = countriesToFilter.filter((country) => (
        country.name.common.toLowerCase().includes(newCountryName.toLowerCase())
    ))
    return filtered
}

export const filterByPopulation = (newPopulation, countriesToFilter) => {
    const valueInMill = newPopulation * 1000000
    const filtered = countriesToFilter.filter((country) => (
        country.population < valueInMill
    ))
    return filtered
}

export const sortByName = (sortValue, countiesToSort) => {
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

export const paginate = (paginateNum, countriesToPaginate) => {
    const newPaginatedState = countriesToPaginate.slice(0, paginateNum)
    return newPaginatedState
}