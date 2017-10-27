import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import { compareFcn } from '../utils/helpers';

import SortButtons  from './SortButtons';
import PostThumb from './posts/PostThumb';

class CategoryView extends Component {

  state = {
    activeTab: 'all',
    compareField: 'voteScore',
    reverseOrder: false
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

  render () {
    const { activeTab, compareField, reverseOrder } = this.state;
    const { posts, comments, categories, isFetching } = this.props;
    return (

      <div className="container">
        <SortButtons
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

        {isFetching
          ? <Loading delay={200} type='spin' color='#222' className='loading'/>
          : <TabContent activeTab={activeTab}>
            {categories && categories.map(category => (
              <TabPane key={category.name} tabId={category.name}>
                <div className="col">
                  {posts && posts.length > 0
                  && posts.filter(post => category.name === 'all' || post.category === category.name)
                    .sort(compareFcn(compareField, reverseOrder))
                    .map(post => (
                      <PostThumb key={post.id} post={post} comments={comments[post.id]}/>
                    ))
                  }
                </div>
              </TabPane>
            ))}
          </TabContent>
        }
      </div>
    );
  }
}

function mapStateToProps ({ posts, comments, categories }) {
  return {
    posts: posts.items,
    isFetching: posts.isFetching,
    comments: comments.items,
    categories: categories.items
  }
}

export default connect(mapStateToProps)(CategoryView);

