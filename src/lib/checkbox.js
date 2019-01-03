//manager/src/lib/checkbox.js
import React, { Component } from 'react'
import { Checkbox, TableCell,} from '@material-ui/core';

export default class Checkbox extends Component {

    onSelectedField = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {

            newSelected = newSelected.concat(selected, id);

        } else if (selectedIndex === 0) {

            newSelected = newSelected.concat(selected.slice(1));

        } else if (selectedIndex === selected.length - 1) {

            newSelected = newSelected.concat(selected.slice(0, -1));

        } else if (selectedIndex > 0) {

            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );

        }
    
        this.setState({ selected: newSelected });
    }

    

    render() {
        return (
            <TableCell padding="checkbox" onClick={ event => { this.onSelectedField(event, invoice._id) } } >
                <Checkbox checked={isSelected} />
            </TableCell>
        )
    }
}
