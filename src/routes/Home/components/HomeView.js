import './HomeView.scss'
import FormGroup from 'react-bootstrap/es/FormGroup'
import FormControl from 'react-bootstrap/es/FormControl'
import React from 'react'
import PropTypes from 'prop-types'
import * as ReactDOM from 'react-dom'

export class HomeView extends React.Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    search: PropTypes.func.isRequired,
    str: PropTypes.string.isRequired
  }

  componentDidMount () {

  }

  render () {
    return (
      <div>
        <div className="text-center" style={{ marginBottom: '50px' }}>
          <h1 style={{ marginBottom: '10px' }}>Physics concepts</h1>
          <img style={{ width: '200px' }} src={'/logo.png'} />
        </div>
        <FormGroup>
          <FormControl id='searchbar' autoFocus='True' ref={(searchbar) => { this.searchbar = searchbar }} type='text'
            placeholder='Search' onChange={(e) => this.props.search(e.target.value)} value={this.props.str}
            style={{ fontSize: '15px' }} />
        </FormGroup>
        {this.props.results}
      </div>)
  }
}

export default HomeView
