import React from 'react'
import { Spinner as StyledSpinner } from './spinner.js'

const Spinner = () => (
  <StyledSpinner>
    <div className="spinner">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>
  </StyledSpinner>
)

export default Spinner
