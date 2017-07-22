import './HomeView.scss'
import FormGroup from 'react-bootstrap/es/FormGroup'
import FormControl from 'react-bootstrap/es/FormControl'
import React from 'react'
import PropTypes from 'prop-types'

export class HomeView extends React.Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    search: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.search('')
  }

  render () {
    return (
      <div>
        <h1>Welcome</h1>
        <FormGroup>
          <FormControl type='text' placeholder='Search'
            onChange={(e) => this.props.search(e.target.value)} style={{ fontSize: '15px' }} />
        </FormGroup>
        {this.props.results}
      </div>)
  }
}

export default HomeView
