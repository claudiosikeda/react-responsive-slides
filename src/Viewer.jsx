import React, { useState } from 'react'
import Slide from './Slide.jsx'
import {
  Mask,
  ViewerContainer
} from './styles.js'

function Viewer (props) {
  const {
    slides
  } = props

  const [currentSlide, setCurrentSlide] = useState(0)

  const onPrevious = () => {
    setCurrentSlide(currentSlide - 1)
  }

  const onNext = () => {
    setCurrentSlide(currentSlide + 1)
  }

  const renderItem = (slide, index) => (
    <Slide
      key={index}
      slide={slide}
      current={index === currentSlide}
      onPrevious={onPrevious}
      onNext={onNext}
    />
  )

  return (
    <ViewerContainer>
      <Mask />
      {slides.map((item, index) => renderItem(item, index))}
    </ViewerContainer>
  )
}

export default Viewer
