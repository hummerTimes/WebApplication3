import React from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from "match-sorter";
import { newPerson, range } from "./Utils";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData().map(item => ({ ...item }))
    };
    this.loadData();
  }
  loadData = () => {
    fetch("api/SampleData/Phones")
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
      });
  };
  deleteData = item => {
    return fetch("api/SampleData/Phones" + "/" + item, {
      method: "delete"
    }).then(response =>
      response.json().then(json => {
        return json;
      })
    );
  };

  onAddPhone = phone => {
    fetch("api/SampleData/Phones", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: "Alibaba", phone: "111" })
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        alert(JSON.stringify(data));
      });
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
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };
  handleDelete = rows => {
    var { data } = this.state;
    const { id, name } = rows;
    data.splice(id, 1);
    this.deleteData(name);
    this.setState(function(prevState, props) {
      return { data };
    });
  };
  addRow = () => {
    var { data } = this.state;
    data.unshift({
      ...newPerson(),
      children: range(10).map(newPerson),
      name: "worker"
    });
    this.onAddPhone();
    this.setState({ data });
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

render(<App apiUrl="api/SampleData/Phone" />, document.getElementById("root"));
