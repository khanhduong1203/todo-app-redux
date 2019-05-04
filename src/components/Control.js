import React,{Component} from 'react';
import SearchBar from './SearchBar';
import SortControl from './SortControl';

export default class Control extends Component{
    render(){
        return(
            <div className='taskControl' style={{width:'50%',display:'inline-block'}}>
                <SortControl />
                <SearchBar />
            </div>
        )
    }
};