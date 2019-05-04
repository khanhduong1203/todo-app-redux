import React, { Component } from 'react'
import '../css/AddForm.css'
import {connect} from 'react-redux'
import * as actions from './../actions/index'
class AddForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            id:'',
            name: '',
            status: false
        }
    }

    componentWillMount(){
        if(this.props.edittingTask &&  this.props.edittingTask.id!==null){
            this.setState({
                id: this.props.edittingTask.id,
                name: this.props.edittingTask.name,
                status: this.props.edittingTask.status
            })  
        }else{
            this.onClearFull()
        }
    }

    componentWillReceiveProps(nextprops){
        if(nextprops && nextprops.edittingTask){
            this.setState({
                id: nextprops.edittingTask.id,
                name: nextprops.edittingTask.name,
                status: nextprops.edittingTask.status
            })
        }else{
            this.onClear()
        } 
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    handleChange = (event) =>{
        var target = event.target
        var name = target.name
        var value = target.value
        this.setState({
            [name]: value
        })
    }

    onSave = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state)
        this.onClearFull()
        //this.onCloseForm() 
    }
    onClearFull = () => {
        this.setState({
            id:'',
            name:'',
            status:false
        })
    }
    onClear = () => {
        this.setState({
            //id:'',
            name:'',
            status:false
        })
    }

    render(){
        if(!this.props.isDisplayForm) return null
        return(
            <div className='addForm'>
                <h1 onClick={this.onCloseForm} style={{cursor:'pointer', color:'red', textAlign:'right',margin:0}}>X</h1>
                <h3>{this.state.id?'Sửa':'Thêm mới'}</h3>
                {/* <h3>Thêm</h3> */}
                <form onSubmit={this.onSave}>
                    <div> 
                        <input type="text" name='name' value={this.state.name} onChange={this.handleChange}
                        placeholder='Tên cv' className='nameNewTask' required/>
                    </div>
                    <div>
                        <span>Trạng thái </span>
                        <select name='status' value={this.state.status} onChange={this.handleChange} >
                            <option value={true}>Enable</option>
                            <option value={false}>Disable</option>                        
                        </select>
                    </div>
                    <button type='submit'>Lưu</button>
                    <button type='button' onClick={this.onClear}>Hủy</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        isDisplayForm : state.isDisplayForm,
        edittingTask : state.edittingTask
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return{
        onSaveTask: (task)=>{
            dispatch(actions.saveTask(task))
        },
        onCloseForm: () => {
            dispatch(actions.closeForm())
        },
        onToggleForm: () => {
            dispatch(actions.toggleForm())
        }     
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddForm);