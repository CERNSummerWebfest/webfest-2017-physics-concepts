import React from 'react'
import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap'

export class Result extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string
  }

  render () {
    return (
      <div className='panel panel-default result' onClick={() => console.log('Test')}>
        <div className='panel-heading'>
          <h2>{this.props.title}</h2>
        </div>
        <p style={{ marginTop: '25px', fontSize: '11pt' }}>
          {this.props.description}
        </p>
      </div>
    )
  }
}
