import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
class SortControl extends Component {
  onClick = (sortBy, sortValue) => {
    let sort = {
      by: sortBy,
      value: sortValue
    };
    this.props.onSort(sort);
  };
  // className={(this.state.by==='status'&&this.state.value===-1)?'onColor':''}
  render() {
    return (
      <div className="dropdown" style={{ display: "inline-block" }}>
        <button className="dropbtn">Sắp xếp</button>
        <div className="dropdown-content">
          <p onClick={() => this.onClick("name", 1)}>A -> Z</p>
          <p onClick={() => this.onClick("name", -1)}>Z -> A</p>
          <p onClick={() => this.onClick("status", 1)}>Status : enable</p>
          <p onClick={() => this.onClick("status", -1)}>Status : disable</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSort: sort => {
      dispatch(actions.sortTask(sort));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortControl);
