import { Result } from '../components/ResultComponent'
import React from 'react'
import Concept from '../components/Concept'

export const SEARCH_START = 'SEARCH_START'
export const SEARCH_END = 'SEARCH_END'

export const GET_COMPONENT = 'GET_COMPONENT'

export function search (str) {
  return (dispatch, getState) => {
    dispatch({
      type: SEARCH_START,
      str: str
    })
    if (str === '') {
      dispatch({
        type: SEARCH_END,
        results: []
      })
    } else {
      fetch(`http://localhost:3000/api/compare?str=${str}`)
        .then(response => response.json())
        .then(json => {
          dispatch({
            type: SEARCH_END,
            results: json
          })
        })
    }
  }
}

export function getComponent (id) {
  return (dispatch, getState) => {
    fetch(`http://localhost:3000/api/concept/${id}`)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: GET_COMPONENT,
          concept: json
        })
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SEARCH_START]: (state, action) => Object.assign({}, state, { str: action.str }),
  [SEARCH_END]: (state, action) => {
    return Object.assign({}, state, { results: action.results.map(res => (
      <Result key={res._id} concept={res.concept} definition={res.definition} id={res.id} />
    )) })
  },
  [GET_COMPONENT]: (state, action) => Object.assign({}, state, { concept: action.concept })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  results: [],
  str: '',
  concept: { title: '', definition: '' }
}
export default function homeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
