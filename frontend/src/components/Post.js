import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

import { timestampToHuman } from '../utils/helpers';

const Post = ({ post }) => (
  <Card body outline color="info" className="text-center">
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
              <span className="voteScore">{post.voteScore}</span>
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
);

export default Post;