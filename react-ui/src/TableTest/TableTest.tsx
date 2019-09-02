import React from "react";
import { makeData, Logo, Tips } from "../Utils";
import withFixedColumns from "react-table-hoc-fixed-columns";

// Import React Table
import ReactTable from 'react-table';
import "react-table/react-table.css";
import 'react-table-hoc-fixed-columns/lib/styles.css';

interface ITableTestProps{ 
  className?: string | undefined
}
interface ITableTestState{
  data: any
  selected: {[key: string]: any}
  selectAll: number
}

const ReactTableFixedColumns = withFixedColumns(ReactTable);

export default class TableTest extends React.Component<ITableTestProps, ITableTestState, any> {
  constructor(props: ITableTestProps) {
    super(props);

    this.state = { selected: {}, selectAll: 0, data: makeData() };
  }

	private toggleRow = (id: string) => {
		const newSelected = Object.assign({}, this.state.selected);
		newSelected[id] = !this.state.selected[id];
		this.setState({
			selected: newSelected,
			selectAll: 2
		});
	}

	private toggleSelectAll = () => {
		const newSelected: {[key: string]: any} = {};

		if (this.state.selectAll === 0) {
			this.state.data.forEach((x: {id: string}) => {
				newSelected[x.id] = true;
			});
		}

		this.setState({
			selectAll: this.state.selectAll === 0 ? 1 : 0,
			selected: newSelected,
		});
	}

  public render() {
    const { className } = this.props;
    const { data } = this.state;
    return (
      <div className={className}>
        <ReactTableFixedColumns
          showPagination={false}
          data={data}
          style={{
            // Setting this will force the table body to overflow and scroll (which triggers sticky headers/footers)
            height: '400px',
            width: '90%',
          }}
          columns={[
            {
              Header: "Name",
              fixed: "left",
              columns: [
                {
                  id: "checkbox",
                  accessor: "",
                  Cell: ({ original }: any) => {
                    return (
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={this.state.selected[original.id] === true}
                        onChange={() => this.toggleRow(original.id)}
                      />
                    );
                  },
                  Header: (x: any) => {
                    return (
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={this.state.selectAll === 1}
                        ref={input => {
                          if (input) {
                            input.indeterminate = this.state.selectAll === 2;
                          }
                        }}
                        onChange={() => this.toggleSelectAll()}
                      />
                    );
                  },
                  sortable: false,
                  width: 45
                },
                {
                  Header: "Last Name",
                  accessor: "lastName",
                  width: 100
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Age",
                  accessor: "age",
                  width: 300,
                  Footer: (row: {[key: string]: any}) => {
                    const length = row.data.length;
                    const ageSum = row.data
                      .map(({ age }: any) => age)
                      .reduce((a: any, b: any) => a + b, 0);
                    const average = Math.round(ageSum / length);
                    return <div>average: {average}</div>;
                  }
                },
                {
                  Header: "Visits",
                  accessor: "visits",
                  width: 300
                },
                {
                  Header: "Progress",
                  accessor: "progress",
                  width: 300
                },
                {
                  Header: "Age",
                  accessor: "age",
                  id: "age2",
                  width: 300
                },
                {
                  Header: "Visits",
                  accessor: "visits",
                  id: "visits2",
                  width: 300
                },
                {
                  Header: "Progress",
                  accessor: "progress",
                  id: "progress2",
                  width: 300
                }
              ]
            },
            {
              Header: "",
              fixed: "right",
              columns: [
                {
                  Header: "Status",
                  accessor: "status"
                }
              ]
            }
          ]}
          defaultPageSize={50}
          className="-striped"
        />
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}