import React from 'react'
import Winner from './Winner'
import Vote from './Vote'

export default React.createClass({
    render: function () {
        {this.props.winner ? 
            <Winner ref="winner" winner="{this.props.winner}" /> :
            <Vote {...this.props} /> }
    }
})