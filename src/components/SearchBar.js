import React, { Component } from 'react';

export default class SearchBar extends Component{

    constructor(props){
        super(props)
        this.state=({
            keyword:''
        })
    }

    onChange =(event)=>{
        var target = event.target
        var name = target.name
        var value = target.value
        this.setState({
            [name]: value
        })
    }

    onSearch=()=>{
        this.props.onSearch(this.state.keyword)
        this.setState({keyword:''})
    }


   render(){
       var {keyword} = this.state
       return(
           <div className='searchBar' >
                <input value={keyword} type='text' onChange={this.onChange} name='keyword'/>
                <button onClick={this.onSearch}>Tìm</button>
           </div>
       )
   } 
}