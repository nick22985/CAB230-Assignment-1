import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

const makeDefaultState = () => ({
    sorted: [],
    page: 0,
    pageSize: 10,
    expanded: {},
    resized: [],
    filtered: []
  });

export default class table extends Component {
    constructor(props) {
        super(props);
        this.state = makeDefaultState();
        this.resetState = this.resetState.bind(this);
        this.options = {
            sortIndicator: false  // disable sort indicator
        };
    }

    resetState() {
        this.setState(makeDefaultState());
      }

    render() {
        return (
        <div>
            <ReactTable
            data={this.props.offencelistfromparent.result}
            columns={[
                {
                Header: "Offences",
                columns: [
                    {
                        Header: "LGA",
                        id: "lga",
                        accessor: d => d.LGA
                    },
                    {
                        Header: "Total",
                        id: "total",
                        accessor: d => d.total
                    },
                    {
                        Header: "Latitude",
                        id: "lat",
                        accessor: d => d.lat
                    },
                    {
                        Header: "longitude",
                        id: "lng",
                        accessor: d => d.lng
                    }
                ]
                }
            ]}
            defaultPageSize={10}
            filterable
            className="-striped -highlight"
            sorted={this.state.sorted}
            page={this.state.page}
            pageSize={this.state.pageSize}
            expanded={this.state.expanded}
            resized={this.state.resized}
            filtered={this.state.filtered}
            onSortedChange={sorted => this.setState({ sorted })}
            onPageChange={page => this.setState({ page })}
            onPageSizeChange={(pageSize, page) =>
                this.setState({ page, pageSize })}
            onExpandedChange={expanded => this.setState({ expanded })}
            onResizedChange={resized => this.setState({ resized })}
            onFilteredChange={filtered => this.setState({ filtered })}
            />
            <br />
        </div>
        );
    }
}
