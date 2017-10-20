import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

export default class PostView extends Component {

  render () {

    const { id } = this.props.match.params;

    return (
      <div className="container">
        <div className="separator-30"></div>
        <div className="row">
          <Card body className="text-center">
            {/*<CardTitle>{post.title}</CardTitle>*/}
            {/*<CardText>{post.body}</CardText>*/}
          </Card>
        </div>
      </div>
    );
  }
}