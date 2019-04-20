import React,{Component} from 'react';

export default class SortControl extends Component{

    onClick =(_by,_value)=> {
        this.props.onSort(_by,_value)
    }

    render(){
        return(
            <div className="dropdown">
                <button className="dropbtn">Sắp xếp</button>
                <div className="dropdown-content">
                    <p onClick={()=> this.onClick('name',1)} 
                       style={(this.props.sortby==='name' && this.props.sortvalue===1)?{color:'blue'}:{}}>A -> Z</p>
                    <p onClick={()=> this.onClick('name',-1)}
                       style={(this.props.sortby==='name' && this.props.sortvalue===-1)?{color:'blue'}:{}}>Z -> A</p>
                    <p onClick={()=> this.onClick('status',1)}
                       style={(this.props.sortby==='status' && this.props.sortvalue===1)?{color:'blue'}:{}}>Status : enable</p>
                    <p onClick={()=> this.onClick('status',-1)}
                       style={(this.props.sortby==='status' && this.props.sortvalue===-1)?{color:'blue'}:{}}>Status : disable</p>
                </div>
            </div>
        )
    }
}