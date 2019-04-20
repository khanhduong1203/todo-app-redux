import React,{ Component } from 'react';
import TaskItem from './TaskItem';
import '../css/TaskList.css';

export default class TaskList extends Component {
    
    constructor(props){
        super(props);
        this.state = ({
            filterName:'',
            filterStatus:'all'
        })
    }

    onUpdateStatus = (data) => {
        this.props.onUpdateStatus(data)
    }

    onDeleteTask = (id) => {
        this.props.onDeleteTask(id)
    }

    onUpdateTask = (id) => {
        this.props.onUpdateTask(id)
    }

    onChange = (event) => {
        var target = event.target
        var name = target.name
        var value = target.value
        this.props.onFilter(
            name==='filterName'?value:this.state.filterName,
            name==='filterStatus'?value:this.state.filterStatus
        )
        this.setState({
            [name]: value
        })
    }

    render(){
        var { filterName, filterStatus} = this.state;
        var {tasks} = this.props

        var elmtasks = tasks.map((_task,index) => {
            return <TaskItem task={_task} key={_task.id} index={index}
                            onUpdateStatus={this.props.onUpdateStatus}
                            onDelete = {this.props.onDeleteTask}
                            onUpdate = {this.props.onUpdateTask}/>
        });
        return(
            <div className="TaskList">
                <table className='tableList'>
                    <thead>
                        <tr key='Z'>
                            <th>STT</th>
                            <th>Tên cv</th>
                            <th>Trạng thái</th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key='ZZ'>
                            <th></th>
                            <th><input name='filterName' type='text' value={filterName} onChange={this.onChange}/></th>
                            <th><select name='filterStatus' onChange={this.onChange} value={filterStatus}>
                                <option value='all'>All</option>
                                <option value='enable'>Enable</option>
                                <option value='disable'>Disable</option>
                            </select></th>
                            <th>
                                
                            </th>
                        </tr>
                        {elmtasks}
                    </tbody>
                    
                </table>
            </div>
        )
    }
}