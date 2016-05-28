import {Map, fromJS} from 'immutable'
import {expect} from 'chai'
import {setState, vote} from '../src/action_creator'

describe('acton creator', () => {
    it('setState', () => {
        const actionState = setState(Map())              
        
        expect(actionState.type).to.equal('SET_STATE')
        expect(actionState.state).to.equal(fromJS({}))
    })
    
    it('vote', () => {
        const actionState = vote('Trainspotting')
        
        expect(actionState.type).to.equal('VOTE')
        expect(actionState.entry).to.equal('Trainspotting')
    })
})