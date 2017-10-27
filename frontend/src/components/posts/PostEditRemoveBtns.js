import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import { removePost, selectPost } from '../../actions/index';

class PostEditRemoveBtns extends Component {

  remove = () => {
    const { post, dispatch } = this.props;
    dispatch(removePost(post.id));
  };

  render () {
    const { post, dispatch } = this.props;
    return (
      <div id="edit-ctrls" className="row text-right post-controls">
        <div className="col">
          <Link to={`/${post.category}/${post.id}/edit`}>
            <Button
              outline
              color="info"
              onClick={() => {
                dispatch(selectPost(post));
              }}>
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
  return { post: ownProps.post };
}

export default connect(mapStateToProps)(PostEditRemoveBtns);