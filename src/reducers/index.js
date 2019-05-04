import {combineReducers} from 'redux'
import tasks from './tasks'
import isDisplayForm from './isDisplayForm'
import edittingTask from './edittingTask'
import filterTable from './filterTable'
import search from './search'
import sort from './sort'

const myReducer = combineReducers({
    tasks,
    isDisplayForm,
    edittingTask,
    filterTable,
    search,
    sort
})

export default myReducer;