import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { selectPost } from '../actions';

/*
  Component with control buttons needed in CategoryView component to sort posts and add new post.
 */
class SortButtons extends React.Component {
  state = {
    dropdownOpen: false
  };

  toggle () {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render () {

    const { onSelect, reverseOrder, changeOrder, dispatch } = this.props;

    return (
      <div className="col text-right">
        <Link to={`/add`}>
          <Button
            color="success"
            onClick={() => dispatch(selectPost(null))}>
            Add a post
          </Button>
        </Link>
        <ButtonDropdown
          className="btn-order"
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle.bind(this)}>
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

function mapStateToProps (state, ownProps) {
  return { ownProps };
}

export default connect(mapStateToProps)(SortButtons);