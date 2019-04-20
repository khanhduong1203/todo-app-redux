import React, { Component } from 'react'
import '../css/AddForm.css'

export default class AddForm extends Component{

    constructor(props){
        super(props);
        this.state = ({
            id:'',
            name:'',
            status: 'disable'
        })
    }

    componentWillMount(){
        if(this.props.task){
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            })
        }
    }

    componentWillReceiveProps(nextprops){
        if(nextprops && nextprops.task){
            this.setState({
                id: nextprops.task.id,
                name: nextprops.task.name,
                status: nextprops.task.status
            })
        }else if(!nextprops.task){
            this.setState({
                id: '',
                name: '',
                status: 'disable'
            })
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) =>{
        var target = event.target
        var name = target.name
        var value = target.value
        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state)
        this.setState({
            name:'',
            status:'disable'
        })
    }

    onCancel = () => {
        this.setState({
            name:'',
            status:'disable'
        })
    }

    render(){
        var {id} = this.state;
        return(
            <div className='addForm'>
                <p onClick={this.onCloseForm} style={{cursor:'pointer', color:'red'}}>Close</p>
                <h3>{id!==''?'Sửa cv':'Thêm mới'}</h3>
                <form onSubmit={this.onSubmit}>
                    <div> 
                        <input type='text' name='name' value={this.state.name} onChange={this.onChange}
                        placeholder='Tên cv' className='nameNewTask'/>
                    </div>
                    <div>
                        <span>Trạng thái </span>
                        <select name='status' value={this.state.status} onChange={this.onChange} >
                            <option value='enable'>Enable</option>
                            <option value='disable'>Disable</option>                        
                        </select>
                    </div>
                    <button type='submit'>Lưu</button>
                    <button type='button' onClick={this.onCancel}>Hủy</button>
                </form>
            </div>
        )
    }
}