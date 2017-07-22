import { Result } from '../components/ResultComponent'
import React from 'react'

export const SEARCH_START = 'SEARCH_START'
export const SEARCH_END = 'SEARCH_END'

export function search (str) {
  return (dispatch, getState) => {
    dispatch({ type: SEARCH_START })
    if (str === '') {
      dispatch({
        type: SEARCH_END,
        results: []
      })
    } else {
      fetch(`http://localhost:3000/compare?str=${str}`)
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

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SEARCH_START]: (state, action) => state,
  [SEARCH_END]: (state, action) => {
    return Object.assign({}, state, { results: action.results.map(res => (
      <Result key={res._id} title={res.title} description={res.description} />
    )) })
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  results: []
}
export default function homeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
