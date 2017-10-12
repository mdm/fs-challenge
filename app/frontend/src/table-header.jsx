import React from 'react';

export default class TableHeader extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.sortOrderIcons = {
            none: '',
            ascending: '\u25b4',
            descending: '\u25be'
        };
    }

    handleClick() {
        this.props.requestSort(this.props.name);
    }

    render () {
        return (
            <th onClick={this.handleClick}>
                {this.props.caption} {this.sortOrderIcons[this.props.sortOrder]}
            </th>
        );
    }
}