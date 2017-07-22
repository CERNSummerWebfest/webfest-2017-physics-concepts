import React from 'react'
import PropTypes from 'prop-types'

export default class Concept extends React.Component {
  static propTypes = {
    concept: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  }

  componentWillMount () {
    this.props.getComponent(this.props.params.id)
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-xs-9'>
            <h1>{this.props.concept.title}</h1>
            <h2>Definition</h2>
            {this.props.concept.definition}

            <h2>Explanation</h2>
            {this.props.concept.explanation}

            <h2>Example</h2>
            {this.props.concept.examples}

            <h2>Applications</h2>
            {this.props.concept.applications}

            <h2>Confusions</h2>
            {this.props.concept.confusions}
          </div>
          <div className='col-xs -offset-2 col-xs-3'>
            {this.props.concept.magnitude}
          </div>
        </div>

      </div>
    )
  }
}
