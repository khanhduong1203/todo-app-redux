import React, { Component } from "react";
import TaskItem from "./TaskItem";
import "../css/TaskList.css";
import { connect } from "react-redux";
import * as actions from "../actions/index";
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1
    };
  }

  onChange = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    var filter = {
      name: name === "filterName" ? value : this.state.filterName,
      status: name === "filterStatus" ? value : this.state.filterStatus
    };
    this.props.onFilterTable(filter);
    this.setState({
      [name]: value
    });
  };

  render() {
    var { tasks, filterTable, keyword, sort } = this.props;
    //filter
    if (filterTable.name) {
      tasks = tasks.filter(task => {
        return (
          task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
        );
      });
    }

    tasks = tasks.filter(task => {
      if (filterTable.status === -1) {
        return task;
      } else {
        return task.status === (filterTable.status === 0 ? true : false);
      }
    });

    //search
    tasks = tasks.filter(task => {
      return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });

    //sort
    if (sort.by === "name") {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sort.value;
        else if (a.name < b.name) return -sort.value;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sort.value;
        else if (a.status < b.status) return sort.value;
        else return 0;
      });
    }

    //map
    var elmtasks = tasks.map((_task, index) => {
      return <TaskItem task={_task} key={_task.id} index={index} />;
    });

    return (
      <div className="TaskList" style={{ marginTop: "30px" }}>
        <table className="tableList">
          <thead>
            <tr key="Z">
              <th>STT</th>
              <th>Tên cv</th>
              <th>Trạng thái</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            <tr key="ZZ">
              <th />
              <th>
                <input
                  name="filterName"
                  type="text"
                  placeholder="filter..."
                  value={this.state.filterName}
                  onChange={this.onChange}
                />
              </th>
              <th>
                <select
                  name="filterStatus"
                  onChange={this.onChange}
                  value={this.state.filterStatus}
                >
                  <option value={-1}>All</option>
                  <option value={0}>Enable</option>
                  <option value={1}>Disable</option>
                </select>
              </th>
              <th />
            </tr>
            {elmtasks}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    filterTable: state.filterTable,
    keyword: state.search,
    sort: state.sort
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable: filter => {
      dispatch(actions.filterTask(filter));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
