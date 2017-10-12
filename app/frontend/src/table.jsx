import React from 'react';
import moment from 'moment';

import TableHeader from './table-header.jsx';

export default class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortOrder: {
                city: 'none',
                start_date: 'none',
                end_date: 'none',
                price: 'none',
                status: 'none',
                color: 'none'
            }
        };

        this.requestSort = this.requestSort.bind(this);
    }

    requestSort(name) {
        let newSortOrder = {
            city: 'none',
            start_date: 'none',
            end_date: 'none',
            price: 'none',
            status: 'none',
            color: 'none'
        };

        if(this.state.sortOrder[name] === 'ascending') {
            newSortOrder[name] = 'descending';
        } else {
            newSortOrder[name] = 'ascending';
        }

        this.setState({ sortOrder: newSortOrder });

        this.props.requestSort(name, newSortOrder[name]);
    }

    getLuminance(colorString) {
        let red = parseInt(colorString.substr(1, 2), 16);
        let green = parseInt(colorString.substr(3, 2), 16);
        let blue = parseInt(colorString.substr(5, 2), 16);
        let luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue); // see https://stackoverflow.com/questions/596216/
        return luminance;
    }

    render () {
        return (
            <div>
            <p>{this.props.rows.length} items found.</p>
            <table>
                <thead>
                    <tr>
                        <TableHeader name="city" caption="City" sortOrder={this.state.sortOrder.city} requestSort={this.requestSort}/>
                        <TableHeader name="start_date" caption="Start Date" sortOrder={this.state.sortOrder.start_date} requestSort={this.requestSort}/>
                        <TableHeader name="end_date" caption="End Date" sortOrder={this.state.sortOrder.end_date} requestSort={this.requestSort}/>
                        <TableHeader name="price" caption="Price" sortOrder={this.state.sortOrder.price} requestSort={this.requestSort}/>
                        <TableHeader name="status" caption="Status" sortOrder={this.state.sortOrder.status} requestSort={this.requestSort}/>
                        <TableHeader name="color" caption="Color" sortOrder={this.state.sortOrder.color} requestSort={this.requestSort}/>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.rows.map((row) => {
                            let alignRight = { textAlign: 'right' };
                            let colorStyle = { backgroundColor: row.color };
                            if(this.getLuminance(row.color) > 127) {
                                colorStyle.color = 'black';
                            } else {
                                colorStyle.color = 'white';
                            }
                            return (
                                <tr key={row.id}>
                                    <td>{row.city}</td>
                                    <td>{row.start_date.format('MM/DD/YYYY')}</td>
                                    <td>{row.end_date.format('MM/DD/YYYY')}</td>
                                    <td style={alignRight}>{row.price}</td>
                                    <td>{row.status}</td>
                                    <td style={colorStyle}>{row.color}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            </div>
        );
    }
}