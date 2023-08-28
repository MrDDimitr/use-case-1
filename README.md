### React Application For Countries Data Visualization

## Description

This is React SPA application, which is used to visualize countries data. It takes all countries from open API https://restcountries.com/v3.1/all. 
The application contains 4 input fields in a form - Country Name, Population, Sort, Pagination Limit. The Country Name field is used to filter all countries by the value from it. The filtering is vase insensitive. The Population fields is used to filter the countries by population less than the value in the field. The Sort field have to include value ascend or descend, if value ascend is given, the countries fill be sorted by country from A to Z. If the value is descend, countries names will be sorted from Z to A. The Pagination Limit returns length of countries even to the value.

## Examples

# Filter by Country Name by explicit name

Input Spain in Country Name field and country Spain should be in the table.

# Filter by Country Name by part of name

Input us in Country Name field and all countries with names which includes us will be
shown in the table.

# Filter by Population

Input 10 in the Population Field and countries with population less than 10 million 
will be shown in the table.

# Ascend sorting

Input ascend and countries in the table will be sorted from A to Z by name.

# Descend sorting

Input descend and countries in the table will be sorted from Z to A by name.

# Sorting

If the value for Sort is different than ascend or descend, sorting will be not performed.

# Pagination

Add any number value in the Pagination Limit field and the length of the countries in the
table will be even to the value.

# Combination 1

Write ascend to the Sort field, write 20 to the Population field, add 20 to the Pagination field and in the table will be displayed only 20 countries with population less than 20, which will be sorted by its name from A to Z

# Combination 2

Do not add any values and you will see all countries available

# Combination 3

Type "un" in the Country Name, Population 500, Sort "descend" and Pagionation Limit 20 and
in the table will be displayed countries only with "un" in the names, with population less than 500 000 000 and sorted by name Z to A.