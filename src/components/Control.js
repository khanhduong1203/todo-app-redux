import React,{Component} from 'react';
import SearchBar from './SearchBar';
import SortControl from './SortControl';

export default class Control extends Component{
    render(){
        return(
            <div className='taskControl'>
                <SearchBar onSearch={this.props.onSearch}/>
                <SortControl onSort={this.props.onSort} sortby={this.props.sortby} sortvalue={this.props.sortvalue}/>
            </div>
        )
    }
};