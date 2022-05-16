import { combineReducers } from 'redux'

import AllLotes from './lotes-reducer'
import ShowLotes from './showLotes-reducer'

const rootReducer=  combineReducers({
AllLotes,
ShowLotes
})

export default rootReducer
