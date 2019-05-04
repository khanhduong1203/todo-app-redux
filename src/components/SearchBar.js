import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/index'
class SearchBar extends Component{

    constructor(props){
        super(props)
        this.state = {
            keyword: ''
        }
    }

    onChange =(event)=>{   
        this.setState({
            keyword: event.target.value
        })
    }

    onSearch=()=>{
        this.props.onSearch(this.state.keyword)
        //this.setState({keyword:''})
    }


   render(){
       var {keyword} = this.state
       return(
           <div className='searchBar' style={{display:'inline-block'}} >
                <input value={keyword} type='text' onChange={this.onChange} name='keyword'/>
                <button onClick={this.onSearch}>Tìm</button>
           </div>
       )
   } 
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch : (keyword) => {
            dispatch(actions.searchTask(keyword))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar);