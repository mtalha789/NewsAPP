import React, { Component } from 'react'
import loading from './loader.gif'
export class Loader extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="" />
      </div>
    )
  }
}

export default Loader
