import React, { Component } from "react";
import _ from "lodash";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";

class EnhancedTableBody extends Component {
  renderCellContent = (item, row) => {
    if (row.content) return row.content(item);
    return _.get(item, row.id);
  };

  render() {
    const { data, emptyRows, rows, onSelect, selected } = this.props;

    return (
      <TableBody>
        {data.map(item => {
          const isSelected = selected.indexOf(item.id) !== -1;
          return (
            <TableRow
              hover
              onClick={event => onSelect(event, item.id)}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={-1}
              key={item.id}
              selected={isSelected}
            >
              <TableCell key={item.id + "checkbox"} padding="checkbox">
                <Checkbox checked={isSelected} />
              </TableCell>
              {rows.map(row => (
                <TableCell key={item.id + row.id} padding={row.padding}>
                  {this.renderCellContent(item, row)}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    );
  }
}

export default EnhancedTableBody;
