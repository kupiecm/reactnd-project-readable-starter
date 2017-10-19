import React from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export class SortButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div className="col-xs-12 text-right">
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret color="info">
            Sort
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>By vote score</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>By timestamp</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <Button color="info"><i className="fa fa-sort-amount-desc"></i></Button>{' '}
      </div>
    );
  }
}