import {List, Map} from 'immutable'
import {expect} from 'chai'

import {setEntries, next, vote} from '../src/core'

describe('application logic', () => {
    describe('setEntries', () => {

        it('add the entries to state', () => {
            const state = Map()
            const entries = List.of('Trainspotting', '28 Days Latter')
            const nextState = setEntries(state, entries)
            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Latter')
            }))
        })

        it('converts to immutable', () => {
            const state = Map()
            const entries = ['Trainspotting', '28 Days Latter']
            const nextState = setEntries(state, entries)
            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Latter')
            }))
        })
    })

    describe('next', () => {
        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of('Trainspotting', '28 Days Latter', 'Sunshine')
            })
            const nextState = next(state)
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Latter')
                }),
                entries: List.of('Sunshine')
            }))
        })
        
         it('puts winner of current vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Latter'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Latter': 2
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            })
            const nextState = next(state)
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting')
            }))
        }) 
        
        it('puts both from tied vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Latter'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Latter': 3
                    }) 
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            })
            const nextState = next(state)
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting', '28 Days Latter')
            }))
        })
        
        it('marks winner when just one entry left', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Latter'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Latter': 2
                    })
                }),
                entries: List()
            })
            const nextState = next(state)
            expect(nextState).to.equal(Map({
                winner: 'Trainspotting'
            }))
        })
    })

    describe('vote', () => {
        it('creates a tally for the voted entry', () => {
            const state = Map({
                    pair: List.of('Trainspotting', '28 Days Latter')
                })
            const nextState = vote(state, 'Trainspotting')
            expect(nextState).to.equal(Map({
                    pair: List.of('Trainspotting', '28 Days Latter'),
                    tally: Map({
                        'Trainspotting': 1
                    })
            }))
        })
        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                    pair: List.of('Trainspotting', '28 Days Latter'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Latter': 2
                    })
            });
            const nextState = vote(state, 'Trainspotting')
            expect(nextState).to.equal(Map({
                    pair: List.of('Trainspotting', '28 Days Latter'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Latter': 2
                    })
            }))
        })
    })
    
    
})
