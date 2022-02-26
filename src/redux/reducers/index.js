import {combineReducers} from 'redux'
import {categoryReducer ,selectedCategoryReducer} from './categoryReducer'
import {cityReducer,selectedCityReducer} from './cityReducer'
import {profileReducer,selectedProfileReducer} from './profileReducer'
import {zoneReducer,selectedZoneReducer} from './zoneReducer'

const reducers=combineReducers({
    categories:categoryReducer,
    category:selectedCategoryReducer,
    cities:cityReducer,
    city:selectedCityReducer,
    profiles:selectedProfileReducer,
    profile:profileReducer,
    zones:selectedZoneReducer,
    zone:zoneReducer,
})

export default reducers;