import React from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export class ControlButtons extends React.Component {
  constructor (props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle () {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render () {

    const { onSelect, reverseOrder, changeOrder } = this.props;

    return (
      <div className="col text-right">
        <Button
          color="success"
          onClick={() => {
          }}>Add a post
        </Button>
        <ButtonDropdown
          className="btn-order"
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}>
          <DropdownToggle caret color="info">
            Sort
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => {
                onSelect('voteScore');
              }}>By vote score</DropdownItem>
            <DropdownItem divider/>
            <DropdownItem
              onClick={() => {
                onSelect('timestamp');
              }}>By timestamp</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <Button
          color="info"
          className="btn-order"
          onClick={() => {
            changeOrder();
          }}>{
          reverseOrder ? <i className="fa fa-sort-amount-desc"></i> :
            <i className="fa fa-sort-amount-asc"></i>
        }</Button>{' '}
      </div>
    );
  }
}