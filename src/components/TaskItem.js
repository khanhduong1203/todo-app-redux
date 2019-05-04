import React,{ Component } from 'react';
import {connect} from 'react-redux'
import * as actions from './../actions/index'
class TaskItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id)
    }

    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.task.id)
        this.props.onCloseForm()
    }

    onEditTask = () => {
        this.props.onOpenForm()
        this.props.onEditTask(this.props.task)
    }

    render(){
        var {task,index}=this.props;
        return(
            <tr>
                <td>{index+1}</td>
                <td>{task.name}</td>
                <td style={task.status===true?{color:'green'}:{color:'red'}}
                    onClick={this.onUpdateStatus}>{task.status===true?'Enable':'Disable'}</td>
                <td>
                    <button type='button' onClick={this.onEditTask}>Sửa</button>
                    <button type='button' onClick={this.onDeleteTask}>Xóa</button>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps  = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id))
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id))
        },
        onEditTask:(task) => {
            dispatch(actions.editTask(task))
        },
        onCloseForm:()=>{
            dispatch(actions.closeForm())
        },
        onOpenForm:()=>{
            dispatch(actions.openForm())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskItem);