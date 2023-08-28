import { sortByName, filterCoutries, filterByPopulation, paginate } from "./manipulatingFunctions";


describe("Test sortByName", () => {
    const createDummyData = () => [
        {
            name: {
                common: "K"
            }
        },
        {
            name: {
                common: "A"
            }
        },
        {
            name: {
                common: "B"
            }
        },
        {
            name: {
                common: "C"
            }
        },
        {
            name: {
                common: "H"
            }
        },
        {
            name: {
                common: "Z"
            }
        },
        {
            name: {
                common: "S"
            }
        },
    ]
    
    it("Test sort by name ascend", () => {
        const dummyDataToSort = createDummyData()
        const sorted = sortByName("ascend", dummyDataToSort)
        expect(sorted[0].name.common).toEqual("A")
        expect(sorted[1].name.common === "B").toEqual(true)
        expect(sorted[sorted.length - 2].name.common === "S").toEqual(true)
        expect(sorted[sorted.length - 1].name.common === "Z").toEqual(true)
    })
    
    it("Test sort by name descend", () => {
        const dummyDataToSort = createDummyData()
        const sorted = sortByName("descend", dummyDataToSort)
        expect(sorted[0].name.common === "Z").toEqual(true)
        expect(sorted[sorted.length - 1].name.common === "A").toEqual(true)
    })
    
    it("Test sort by value not equal ascend or descend", () => {
        const dummyDataToSort = createDummyData()
        const sorted = sortByName("asxdsf", dummyDataToSort)
        expect(sorted[0].name.common === "K").toEqual(true)
        expect(sorted[sorted.length - 1].name.common === "S").toEqual(true)
    })
})

describe("Test filterCoutries", () => {
    const createDummyData = () => [
        {
            name: {
                common: "Bulgaria"
            }
        },
        {
            name: {
                common: "Bulg"
            }
        },
        {
            name: {
                common: "Espania"
            }
        },
        {
            name: {
                common: "Spain"
            }
        },
        {
            name: {
                common: "Congo"
            }
        },
        {
            name: {
                common: "Romania"
            }
        },
        {
            name: {
                common: "Turkey"
            }
        },
    ]

    it("Test empty string", () => {
        const dummyData = createDummyData()
        const filtered = filterCoutries("", dummyData)
        expect(filtered[0].name.common === "Bulgaria").toEqual(true)
        expect(filtered[filtered.length - 1].name.common === "Turkey").toEqual(true)
        expect(filtered.length === 7).toEqual(true)
        expect(filtered.length).toEqual(7)
    })

    it("Test Bulg", () => {
        const dummyData = createDummyData()
        const filtered = filterCoutries("Bulg", dummyData)
        expect(filtered[0].name.common === "Bulgaria").toEqual(true)
        expect(filtered[filtered.length - 1].name.common === "Bulg").toEqual(true)
        expect(filtered.length === 2).toEqual(true)
        expect(filtered.length).toEqual(2)
    })

    it("Test bulg", () => {
        const dummyData = createDummyData()
        const filtered = filterCoutries("bulg", dummyData)
        expect(filtered[0].name.common === "Bulgaria").toEqual(true)
        expect(filtered[filtered.length - 1].name.common === "Bulg").toEqual(true)
        expect(filtered.length === 2).toEqual(true)
        expect(filtered.length).toEqual(2)
    })

    it("Test bULG", () => {
        const dummyData = createDummyData()
        const filtered = filterCoutries("bULG", dummyData)
        expect(filtered[0].name.common === "Bulgaria").toEqual(true)
        expect(filtered[filtered.length - 1].name.common === "Bulg").toEqual(true)
        expect(filtered.length === 2).toEqual(true)
        expect(filtered.length).toEqual(2)
    })

    it("Test not existing word", () => {
        const dummyData = createDummyData()
        const filtered = filterCoutries("NotExisting", dummyData)
        expect(filtered.length).toEqual(0)
    })

    it("Test roMaNiA", () => {
        const dummyData = createDummyData()
        const filtered = filterCoutries("roMaNiA", dummyData)
        expect(filtered.length).toEqual(1)
        expect(filtered[0].name.common === "Romania").toEqual(true)
    })
})

describe('Test filterByPopulation', () => {
    const createDummyData = () => [
        {
            population: 5000000
        },
        {
            population: 10000000
        },
        {
            population: 1000000
        },
        {
            population: 5500
        },
        {
            population: 5500000
        },
        {
            population: 100000000
        },
        {
            population: 9999999
        },
        {
            population: 7000000
        },
        {
            population: 6000000
        },
        {
            population: 999999
        },
        {
            population: 4999999
        },
    ]
    
    it('Test with 5 m', () => {
        const dummyData = createDummyData()
        const filtered = filterByPopulation(5, dummyData)
        filtered.forEach((fil) => {
            expect(fil.population < 5000000).toEqual(true)
        })
        expect(filtered.some((fil) => fil.population === 4999999)).toEqual(true)
    })

    it('Test with 10 m', () => {
        const dummyData = createDummyData()
        const filtered = filterByPopulation(10, dummyData)
        filtered.forEach((fil) => {
            expect(fil.population < 10000000).toEqual(true)
        })
        expect(filtered.some((fil) => fil.population === 9999999)).toEqual(true)
    })

    it('Test with 1 m', () => {
        const dummyData = createDummyData()
        const filtered = filterByPopulation(1, dummyData)
        filtered.forEach((fil) => {
            expect(fil.population < 1000000).toEqual(true)
        })
        expect(filtered.some((fil) => fil.population === 5500)).toEqual(true)
        expect(filtered.length).toEqual(2)
    })
})

describe('Test paginagte', () => {
    const createDummyData = (arrayLentgh) => Array.from({ length: arrayLentgh }, (_, i) => i) 


    it('Test with 10', () => {
        const dummyData = createDummyData(100)
        const paginated = paginate(10, dummyData)
        expect(paginated.length).not.toEqual(100)
        expect(paginated.length).toEqual(10)
        expect(paginated[0]).toEqual(0)
        expect(paginated[paginated.length - 1]).toEqual(9)
    })

    it('Test with 5', () => {
        const dummyData = createDummyData(100)
        const paginated = paginate(5, dummyData)
        expect(paginated.length).not.toEqual(100)
        expect(paginated.length).toEqual(5)
        expect(paginated[0]).toEqual(0)
        expect(paginated[paginated.length - 1]).toEqual(4)
    })
})