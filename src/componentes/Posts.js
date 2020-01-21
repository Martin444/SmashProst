import React, { Component } from 'react';
import Listado from './Listado';

class Posts extends Component {
    render() {
        /**
         * Viene de Router this.props.posts, this.props.borrarPost
         */
        return (
            <div className="col-12 co-md-8">
                <h2 className="text-center"> Posts </h2>

                <Listado
                    posts={this.props.posts}
                    borrarPost={this.props.borrarPost}
                />
            </div>
        );
    }
}

export default Posts;