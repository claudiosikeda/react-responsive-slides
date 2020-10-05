import React from 'react'
import { Spinner as StyledSpinner } from './spinner.js'

const Spinner = () => (
  <StyledSpinner>
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  </StyledSpinner>
)

export default Spinner
