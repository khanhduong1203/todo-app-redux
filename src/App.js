import React, { Component } from 'react';
import './App.css';
import TaskList from './components/TaskList'
import AddForm from './components/AddForm';
import Control from './components/Control';
import {connect} from 'react-redux'
import * as actions from './actions/index'
class App extends Component {
  
  componentWillMount(){
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'))
      this.setState({tasks:tasks})
    }
  }

  onToggleForm = () => {
    var {edittingTask} = this.props
    if(edittingTask && edittingTask.id !== ''){
      this.props.onOpenForm()
    }else{
      this.props.onToggleForm()
    }
    this.props.onClearTask({
      id:'',
      name:'',
      status: false
    })
  }

  render() {
    return (
      <div className="App">
        <div style={{display:'inline-block'}}> 
          <button onClick={this.onToggleForm}>Thêm công việc</button>
        </div>
        <Control onSearch={this.onSearch} />
        <AddForm />
        <TaskList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDisplayForm: state.isDisplayForm,
    edittingTask : state.edittingTask
  }
}

const mapDispatchToProps  = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm())
    },
    onClearTask:(task) => {
      dispatch(actions.editTask(task))
    },
    onOpenForm:()=>{
      dispatch(actions.openForm())
    } 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
