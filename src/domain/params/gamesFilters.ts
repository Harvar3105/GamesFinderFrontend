import {EPriceCompare} from "../enums/EPriceCompare.ts";
import {ESort} from "../enums/ESort.ts";

export default interface GamesFilters {
    search: string,
    priceFilter: EPriceCompare | null,
    priceValue: number,
    priceRangeMin: number,
    priceRangeMax: number,
    sortField: string,
    sortOrder: ESort,
}