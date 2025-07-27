import {EPriceCompare} from "../enums/EPriceCompare";
import {ESort} from "../enums/ESort";

export default interface GamesFilters {
    search: string,
    priceFilter: EPriceCompare | null,
    priceValue: number,
    priceRangeMin: number,
    priceRangeMax: number,
    sortField: string,
    sortOrder: ESort,
}