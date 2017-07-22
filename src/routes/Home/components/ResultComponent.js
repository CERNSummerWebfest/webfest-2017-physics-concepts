import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'

export class Result extends React.Component {
  static propTypes = {
    concept: PropTypes.string.isRequired,
    definition: PropTypes.string,
    id: PropTypes.string.isRequired
  }

  render () {
    return (
      <div className='panel panel-default result' onClick={() => browserHistory.push(`/concept/${this.props.id}`)}>
        <div className='panel-heading'>
          <h3>{this.props.concept}</h3>
        </div>
        <p style={{ margin: '25px 25px 25px 25px' }}>
          {this.props.definition}
        </p>
      </div>
    )
  }
}
