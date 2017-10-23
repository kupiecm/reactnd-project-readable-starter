import React, { Component } from 'react';
import * as API from '../utils/api';
import { timestampToHuman } from '../utils/helpers';

import { Card, Button, CardBody, CardHeader, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import Comments from './Comments';

export default class PostView extends Component {

  state = {
    post: {}
  };

  componentDidMount = () => {

    const { id } = this.props.match.params;
    API
      .getPost(id)
      .then((post) => {
        this.setState({ post });
      });
  };

  render () {

    const { post } = this.state;
    return (
      <div className="container">
        <div className="separator-30"></div>
        <div className="row text-right post-controls">
          <div className="col">
            <Button
              outline
              color="info">
              <i className="fa fa-edit"></i>
            </Button>
            <Button
              outline
              color="info"
              className="btn-order">
              <i className="fa fa-remove"></i>
            </Button>
          </div>
        </div>
        <Card
          body
          outline
          color="info"
          className="text-center">
          <CardBody>
            <CardTitle>{post.title}</CardTitle>
            <CardSubtitle>
              <div className="row">
                <div className="col"></div>
                <div className="col text-center">
                  <small className="text-muted">@{post.author}</small>
                </div>
                <div className="col text-center">
                  <small className="text-muted">
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <span className="voteScore">
                      {post.voteScore}
                    </span>
                  </small>
                </div>
                <div className="col text-center">
                  <small className="text-muted">{timestampToHuman(post.timestamp)}</small>
                </div>
                <div className="col"></div>
              </div>
            </CardSubtitle>
            <hr></hr>
            <div className="separator-50"></div>
            <CardText>{post.body}</CardText>
          </CardBody>
        </Card>
        <div className="separator-50"></div>
        {post && <Comments parentId={post.id}/>}
      </div>
    );
  }
}