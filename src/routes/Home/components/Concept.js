import React from 'react'
import PropTypes from 'prop-types'
import Latex from 'react-latex'
import Linkify from 'react-linkify'
import { FormControl, FormGroup } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import MarkdownRenderer from 'react-markdown-renderer'

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
          <div className='col-xs-12' style={{ textAlign: 'center' }}>
            <button className='btn btn-primary'
              onClick={() => browserHistory.goBack()} style={{ fontSize: '16px' }}>
              Back
            </button>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12' style={{ textAlign: 'center' }}>
            <h1 style={{ marginTop: '50px' }}>{this.props.concept.concept}</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-9'>
            <h2>Definition</h2>
            <Latex>
              {this.props.concept.definition}
            </Latex>

            <h2>Explanation</h2>
            <Latex>
              {this.props.concept.explanation}
            </Latex>

            <h2>Example</h2>
            <MarkdownRenderer markdown={this.props.concept.examples || ''} />

            <h2>Applications</h2>
            <MarkdownRenderer markdown={this.props.concept.applications || ''} />

            <h2>Confusions</h2>
            <MarkdownRenderer markdown={this.props.concept.confusions || ''} />

            <h2>Unknown</h2>
            <MarkdownRenderer markdown={this.props.concept.unknown || ''} />
          </div>
          <div className='col-xs -offset-2 col-xs-3'>
            <img style={{ width: '200px' }} src={'/' + this.props.concept.id + '.png'} />
            <h2>Magnitude</h2>
            <Latex>
              {this.props.concept.magnitude}
            </Latex>
            <h2>Related links</h2>
            <MarkdownRenderer markdown={this.props.concept.related || ''} />
          </div>
        </div>

      </div>
    )
  }
}
