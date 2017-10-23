import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as API from '../utils/api';

import Loading from 'react-loading'
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { ControlButtons } from './ControlButtons';

import { loadPosts, addPost, removePost } from '../actions';
import { compareFcn } from '../utils/helpers';

import PostThumb from './PostThumb';

class CategoryView extends Component {

  state = {
    activeTab: 'all',
    categories: [],
    compareField: 'voteScore',
    reverseOrder: false,
    fetchingData: false
  };

  toggle (tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  filterBy = (compareField) => {
    this.setState({ compareField });
  };

  changeOrder = () => {
    this.setState(() => ({ reverseOrder: !this.state.reverseOrder }));
  };

  componentDidMount = () => {

    this.setState(() => ({ fetchingData: true }));
    API
      .getPosts()
      .then((posts) => {
        this.props.loadPosts(posts);
        this.setState(() => ({ fetchingData: false }));
      });

    API
      .getCategories()
      .then((categories) => {
        categories = [{ name: 'all', path: 'all' }, ...categories];
        this.setState({ categories });
      });
  };

  render () {

    const { activeTab, fetchingData, compareField, reverseOrder, categories } = this.state;
    const { posts } = this.props;

    return (

      <div className="container">
        <ControlButtons
          reverseOrder={reverseOrder}
          onSelect={this.filterBy}
          changeOrder={this.changeOrder}
        />

        <div className="separator-30"></div>

        <Nav tabs>
          {categories && categories.map(category => (
            <NavItem key={category.name}>
              <NavLink
                className={classnames({ active: activeTab === category.name })}
                onClick={() => {
                  this.toggle(category.name);
                }}
              >
                {category.name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>

        {fetchingData === true
          ? <Loading delay={200} type='spin' color='#222' className='loading'/>
          : <TabContent activeTab={activeTab}>
            {categories && categories.map(category => (
              <TabPane key={category.name} tabId={category.name}>
                <div className="col">
                  {posts && posts
                    .filter(post => category.name === 'all' || post.category === category.name)
                    .sort(compareFcn(compareField, reverseOrder))
                    .map(post => (
                      <PostThumb key={post.id} post={post}/>
                    ))}
                </div>
              </TabPane>
            ))}
          </TabContent>
        }
      </div>
    );
  }
}

function mapStateToProps (postsCtrl) {
  return { posts: postsCtrl.posts }
}

function mapDispatchToProps (dispatch) {
  return { loadPosts: (data) => dispatch(loadPosts(data)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);

