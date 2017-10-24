import React, { Component } from 'react';
import Loading from 'react-loading'
import { Card, Button, CardBody, CardHeader, CardTitle, CardSubtitle, CardText } from 'reactstrap';

import * as API from '../utils/api';
import { timestampToHuman } from '../utils/helpers';
import * as ACTION from "../actions/index";

import Comments from './Comments';

export default class PostView extends Component {

  state = {
    post: null,
    fetchingData: false
  };

  componentDidMount = () => {

    const { id } = this.props.match.params;
    this.setState({ fetchingData: true });
    API
      .getPost(id)
      .then(post => {
        this.setState({
          post: post,
          fetchingData: false
        });
      })
      .catch(() => {
        this.setState({ fetchingData: false });
      });
  };

  remove = () => {
    const { id } = this.state.post;
    API
      .removePost(id)
      .then(ACTION.removePost)
      .then(() => {
        this.setState({ post: null });
      });

  };

  render () {

    const { post, fetchingData } = this.state;
    return (

      <section className="container">
        {fetchingData === true
          ? <Loading delay={200} type='spin' color='#222' className='loading'/>
          : <div>
            <div className="separator-50"></div>
            {!post
              ? <div className="alert alert-danger text-center" role="alert">
                <strong>Oh snap!</strong> Could not find the post you were looking for.
              </div>
              : <div>
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
                      className="btn-order"
                      onClick={this.remove}>
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

                <div>
                  <div className="separator-50"></div>
                  <Comments parentId={post.id}/>
                </div>
              </div>
            }
          </div>
        }
      </section>
    );
  }
}