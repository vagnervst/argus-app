import React, { Component } from 'react'

import config from '../../config'
import argus from '@argus-dashboard/components'
import axios from 'axios'

import CookieWrapper from '../CookieWrapper'

const { Argus, ToggleButton, Label } = argus.components

class Dashboard extends Component {

  constructor(props) {
    super(props)

    const { cookies } = this.props

    this.state = {
      is_active: false
    }

    this.toggleActive = this.toggleActive.bind(this)
    this.updateActiveState = this.updateActiveState.bind(this)
  }

  toggleActive(value) {
    value = !value

    axios.put('/supporter/update', {
      is_active: value
    }).then( () => this.setState({
      is_active: value
    }))
  }

  updateActiveState(cb) {
    axios.get('/supporter/login')
    .then( ({ data: supporter }) => {
      this.props.cookies.set('is_active', supporter.is_active)
      cb()
    })
  }

  componentDidMount() {
    this.updateActiveState(() => {
      this.setState({
        is_active: this.props.cookies.get('is_active') === 'true'
      })
    })
  }

  render() {
    return (
      <Argus config={config} headerContent={<ToggleButton active={this.state.is_active} onClick={this.toggleActive} />} />
    )
  }

}

export default CookieWrapper(Dashboard)
