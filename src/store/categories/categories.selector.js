
import { createSelector } from "reselect";

const categoriesSelector = (state) => {
    return state.categories
}  

export const categoriesArraySelector = createSelector(
    [categoriesSelector],
    (categories) =>  {
        return categories.categoriesArray
    })
export const loadingStatusSelector = createSelector(
    [categoriesSelector],
    (categories) => {
        return categories.status
    }
)

export const categoriesMapSelector = createSelector(
    [categoriesArraySelector],
    (categoriesArray) => categoriesArray.reduce((acc, category) => {
        const { title, items } = category;
    
        acc[title.toLowerCase()] = items;
        return acc;
      }, {}) 
)

const statusSelector = state => state.categories.status
