import React,{ Component } from 'react';

export default class TaskItem extends Component {

    // constructor(props){
    //     super(props)
    //     this.state=({

    //     })
    // }

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id)
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id)
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.task.id)
    }

    render(){
        var {task,index}=this.props;

        return(
            <tr>
                <td>{index+1}</td>
                <td>{task.name}</td>
                <td style={task.status==='enable'?  {color:'green'}:{color:'red'}}
                    onClick={this.onUpdateStatus}>{task.status}</td>
                <td>
                    <button type='button' onClick={this.onUpdate}>Sửa</button>
                    <button type='button' onClick={this.onDelete}>Xóa</button>
                </td>
            </tr>
        )
    }
}