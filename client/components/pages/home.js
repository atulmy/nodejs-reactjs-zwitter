// Client / Components / Pages / Home

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import isEmpty from 'lodash/isEmpty';

import { tweetGetRequest } from '../../actions/pages/tweet';
import TweetItem from './tweet-item';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: [],
            noTweets: false,
            errors: {},
            isLoading: false
        }
    }

    componentWillMount() {
        this.setState({ errors: {}, isLoading: true });

        this.props.tweetGetRequest(this.state).then(
            (response) => {
                console.log(response);

                this.setState({ isLoading: false });

                if(!isEmpty(response.data.tweets)) {
                    this.setState({ tweets: response.data.tweets });
                } else {
                    this.setState({ noTweets: true });
                }
            },

            (error) => {
                console.log(error.response.data);

                this.setState({ errors: error.response.data.errors, isLoading: false });
            }
        );
    }

    render() {
        const tweets = this.state.tweets.map((tweet) => {
            return <TweetItem key={ tweet.id } tweet={ tweet } />
        });

        const pleaseWaitMessage = <p>Please wait...</p>;

        const noTweetsMessage = <p>Strange. No one has tweeted yet. <Link to="/tweet">Tweet now</Link></p>;

        return (
            <section>
                <h2>Tweets from all around the world</h2>

                { this.state.isLoading ? pleaseWaitMessage : tweets }

                { this.state.noTweets ? noTweetsMessage : '' }
            </section>
        );
    }
}

HomePage.propTypes = {
    tweetGetRequest: React.PropTypes.func.isRequired
};

export default connect((state) => { return {} }, { tweetGetRequest })(HomePage);