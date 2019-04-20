import React, { Component } from 'react';
import './App.css';
import TaskList from './components/TaskList'
import SearchBar from './components/SearchBar';
import AddForm from './components/AddForm';
import SortControl from './components/SortControl';
import _ from 'lodash'
import Control from './components/Control';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      tasks:[],
      isDisplayForm: false,
      taskEditting: null,
      filter:{
        name:'',
        status: 'all'
      },
      keyword:'',
      sort:{
          by:'name',
          value: 1
      }   
        
    }
  }

  componentWillMount(){
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'))
      this.setState({tasks:tasks})
    }
  }

  s4(){
    return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
  }

  generateID(){
    return this.s4() + this.s4() + '-' + this.s4() + '-' +this.s4() + '-' +this.s4() 
            + '-' +this.s4() + this.s4() + this.s4();
  }

  onToggleForm = () => {
    if(this.state.isDisplayForm && this.state.taskEditting!==null){
      this.setState({
        isDisplayForm: true,
        taskEditting: null
      })
    } else{
      this.setState({
        isDisplayForm: !this.state.isDisplayForm
      })
    } 
  }
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    })
  }
  
  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    })
  }

  onSubmit = (data) => {
    var {tasks} = this.state
    if(data.id===''){
      var task = {
        id: this.generateID(),
        name: data.name,
        status: data.status
      }
      tasks.push(task)
    }else{
      var index = _.findIndex(tasks,(task)=>{
        return task.id === data.id
      });
      tasks[index] = data 
      this.onCloseForm()
    }
    
    this.setState({tasks:tasks,taskEditting:null})
    localStorage.setItem('tasks',JSON.stringify(tasks))
  }

  onUpdateStatus = (id) => {
    var {tasks} = this.state
    var index = _.findIndex(tasks,(task)=>{
      return task.id === id
    });
    if(index !== -1){
      tasks[index].status = tasks[index].status==='enable'?'disable':'enable'
      this.setState({tasks:tasks})
      localStorage.setItem('tasks',JSON.stringify(tasks))
    }
  }

  onDeleteTask = (id) => {
    var {tasks} = this.state
    var index = _.findIndex(tasks,(task)=>{
      return task.id === id
    });
    if(index !== -1){
      tasks.splice(index,1)
      this.setState({tasks:tasks})
      localStorage.setItem('tasks',JSON.stringify(tasks))
    }
    this.onCloseForm()
  }

  onUpdateTask = (id) => {
    var {tasks} = this.state
    var index = _.findIndex(tasks,(task)=>{
      return task.id === id
    });
    if(index !== -1){
      var taskEditting = tasks[index];
      this.setState({taskEditting:taskEditting})
      //localStorage.setItem('tasks',JSON. stringify(tasks))
    }
    this.onShowForm()
  }

  onFilter = (filterName, filterStatus) => {
      this.setState({
        filter:{
          name: filterName.toLowerCase(),
          status: filterStatus
        }
      })
  }

  onSearch=(keyword)=>{
    this.setState({keyword:keyword})
  }

  onSort=(sortby, sortvalue)=>{
    this.setState({
      sort:{
        by:sortby,
        value:sortvalue
      }
    })
  }

  render() {
    var {tasks, isDisplayForm, taskEditting, filter, keyword, sort} = this.state;

    if(filter){
      if(filter.name){
        tasks = tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(filter.name) !== -1
        })
      }
      if(filter.status){
        tasks = tasks.filter((task)=>{
          if(filter.status === 'all'){
            return task
          }else{
            return task.status===filter.status
          }
        })
      }      
    }

    if(keyword){
      tasks = tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(keyword) !== -1
      })
    }
    /**sap xep */
    if(sort.by==='name'){
      tasks.sort((a,b)=>{
        if(a.name > b.name) return sort.value
        else if( a.name < b.name) return -sort.value
        else return 0      
      })
    }else{
      tasks.sort((a,b)=>{
        if(a.status > b.status) return -sort.value
        else if( a.status < b.status) return sort.value
        else return 0      
      })
    }
    var add = isDisplayForm===true?<AddForm onCloseForm={this.onCloseForm} 
                                            onSubmit={this.onSubmit}
                                            task={taskEditting}/>:'';

    return (
      <div className="App">
        <Control onSearch={this.onSearch} onSort={this.onSort} sortby={sort.by} sortvalue={sort.value}/>
        <button onClick={this.onToggleForm}>Thêm công việc</button>
        {add}
        <TaskList tasks={tasks} onUpdateStatus={this.onUpdateStatus} onDeleteTask={this.onDeleteTask}
                                onUpdateTask={this.onUpdateTask} onFilter={this.onFilter}/>
        
      </div>
    );
  }
}

export default App;
