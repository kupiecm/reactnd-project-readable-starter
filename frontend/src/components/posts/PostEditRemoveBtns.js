import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import { removePost } from '../../actions/index';

class PostEditRemoveBtns extends Component {

  remove = () => {
    const { id, dispatch } = this.props;
    dispatch(removePost(id));
  };

  render () {
    const { id } = this.props;
    return (
      <div id="edit-ctrls" className="row text-right post-controls">
        <div className="col">
          <Link to={`/edit/${id}`}>
            <Button
              outline
              color="info">
              <i className="fa fa-edit"></i>
            </Button>
          </Link>
          <Button
            outline
            color="info"
            className="btn-order"
            onClick={this.remove}>
            <i className="fa fa-remove"></i>
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return { id: ownProps.id };
}

export default connect(mapStateToProps)(PostEditRemoveBtns);