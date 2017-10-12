import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Table from './table.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            filterStart: null,
            filterEnd: null,
            filteredItems: []
        };

        this.requestSort = this.requestSort.bind(this);
        this.changeFilterStart = this.changeFilterStart.bind(this);
        this.changeFilterEnd = this.changeFilterEnd.bind(this);
    }

    requestSort(name, sortOrder) {
        let items = this.state.items.slice();
        items.sort((a, b) => {
            if(sortOrder === 'ascending') {
                if(name === 'city') {
                    return a.city.localeCompare(b.city);
                } else if (name === 'start_date' || name === 'end_date') {
                    return a[name].diff(b[name]);
                } else {
                    if(a[name] == b[name]) {
                        return 0;
                    }
                    return a[name] < b[name] ? -1 : 1;
                }
            } else {
                if(name === 'city') {
                    return b.city.localeCompare(a.city);
                } else if (name === 'start_date' || name === 'end_date') {
                    return b[name].diff(a[name]);
                } else {
                    if(a[name] == b[name]) {
                        return 0;
                    }
                    return a[name] < b[name] ? 1 : -1;
                }
            }
        });
        this.setState({ items: items }, this.doFilter);
    }

    changeFilterStart(newFilterStart) {
        this.setState({ filterStart: newFilterStart }, this.doFilter);
    }

    changeFilterEnd(newFilterEnd) {
        this.setState({ filterEnd: newFilterEnd }, this.doFilter);
    }

    doFilter() {
        let filteredItems = this.state.items.filter((item, i) => {
            return item.start_date.isSameOrAfter(this.state.filterStart) && item.end_date.isSameOrBefore(this.state.filterEnd);
        });
        this.setState({
            filteredItems: filteredItems
        });
    }

    componentDidMount() {
        axios.get('/api/items')
        .then((res) => {
            let items = res.data.map((item) => {
                item.start_date = moment(item.start_date, 'MM/DD/YYYY');
                item.end_date = moment(item.end_date, 'MM/DD/YYYY');
                return item;
            });

            let filterStart = moment.min(items.map((item) => {
                return item.start_date;
            }));

            let filterEnd = moment.max(items.map((item) => {
                return item.end_date;
            }));

            this.setState({
                items: items,
                filterStart: filterStart,
                filterEnd: filterEnd,
                filteredItems: items
            });
        });
    }

    render () {
        return (
            <div>
                Filter start: <DatePicker selected={this.state.filterStart} onChange={this.changeFilterStart}/>
                Filter end: <DatePicker selected={this.state.filterEnd} onChange={this.changeFilterEnd}/>
                <Table rows={this.state.filteredItems} requestSort={this.requestSort}/>
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));
