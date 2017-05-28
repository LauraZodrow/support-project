import { combineReducers } from 'redux'
import modal from './modal_reducer'
import user from './user_reducer'

const rootReducer = combineReducers({
    modal,
    user
})

export default rootReducer;