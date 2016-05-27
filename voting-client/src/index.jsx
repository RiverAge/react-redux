import React from 'react'
import ReactDom from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import App from './components/App'
import Voting from './components/Voting'
import Results from './components/Results'

const pair = ['Trainspotting', '28 Days Later']

const routes = <Router component={App}>
    <Route path="/results" component={Results} />
    <Route path="/" component={Voting} />
    </Router>

ReactDom.render(
    <Router history={hashHistory} >{routes}</Router>,
    document.getElementById('app')
)