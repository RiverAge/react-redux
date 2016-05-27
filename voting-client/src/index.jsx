import React from 'react'
import ReactDom from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducer'
import App from './components/App'
import {VotingContainer} from './components/Voting'
import Results from './components/Results'

const store = createStore(reducer)
store.dispatch({
    type: 'SET_STATE',
    state: {
        vote: {
            pair: ['Sunshine', '28d Days Later'],
            tally: { Sunshine: 2 }
        }
    }
})

const pair = ['Trainspotting', '28 Days Later']

const routes = <Router component={App}>
    <Route path="/results" component={Results} />
    <Route path="/" component={VotingContainer} />
</Router>

ReactDom.render(
    <Provider store={store} >
        <Router history={hashHistory} >{routes}</Router>
    </Provider>,

    document.getElementById('app')
)