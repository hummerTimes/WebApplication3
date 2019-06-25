import React, {Component} from "react";
import { makeData } from "./Utils";

import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from "match-sorter";
import { newPerson, range } from "./Utils";
import axios from 'axios';

export default class App extends Component {

  state = { 
    data: makeData() ,
    baseURL: 'api/SampleData'
  };

  componentDidMount() {
    this.loadData();
  }

  setDataTable(data) {
    this.setState((state) => {
      return {data}
    });
  }

  loadData = () => {
       axios.get(`${this.state.baseURL}/Phones`)
      .then(res => {
        const {data} = res;
        this.setDataTable(data);
      })
  };

  deleteData = item => {
    axios.delete(`${this.state.baseURL}/Phones` + "/" + item)
    .then(res => {
      // const {data} = res;
      // this.setState({ data });
    })
  };

  onAddPhone = user => { 
    axios.post(`${this.state.baseURL}/Phones`, { user })
      .then(res => {
        console.log(res);
      })
  };

  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          // alert(e.target.innerText);
          this.setDataTable(data);
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };
  handleDelete = rows => {
    const { id, name } = rows;
    var { data } = this.state;
    
    data.splice(id, 1);
    this.deleteData(name);
    this.setDataTable(data);
  };
  addRow = () => {
    var { data } = this.state;
    data.unshift({
      ...newPerson(),
      children: range(10).map(newPerson),
      name: "worker"
    });
    // this.onAddPhone();
    this.setDataTable(data);
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          defaultSorted={[
            {
              id: "full",
              desc: true
            }
          ]}
          columns={[
            {
              Header: "First Name",
              accessor: "name",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["dateFormatted"] }),
              filterAll: true,
              Cell: this.renderEditable
            },
            {
              Header: "Room",
              accessor: "room",
              Cell: this.renderEditable
            },
            {
              Header: "Phone",
              accessor: "phone",
              Cell: this.renderEditable
            },
            {
              Header: "Remove",
              Cell: rows => (
                <div>
                  <button onClick={() => this.handleDelete(rows.original)}>
                    Delete
                  </button>
                </div>
              )
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <button id="addBtn" onClick={() => this.addRow()}>
          ADD
        </button>
      </div>
    );
  }
}