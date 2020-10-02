import React, { useState } from 'react'
import Slide from './Slide.jsx'
import {
  Mask,
  ViewerContainer,
  ViewerContent
} from './styles.js'

function Viewer (props) {
  const {
    slides
  } = props

  const [currentSlide, setCurrentSlide] = useState(0)
  const [rendered, setRendered] = useState(false)

  const onPrevious = () => {
    setCurrentSlide(currentSlide - 1)
  }

  const onNext = () => {
    setCurrentSlide(currentSlide + 1)
  }

  const onRendered = (index) => {
    if (index === 0) {
      setRendered(true)
    }
  }

  const renderItem = (slide, index) => (
    <Slide
      key={index}
      index={index}
      slide={slide}
      current={index === currentSlide}
      onPrevious={onPrevious}
      onNext={onNext}
      onRendered={onRendered}
    />
  )

  return (
    <ViewerContainer>
      <Mask />
      <ViewerContent rendered={rendered}>
        {slides.map((item, index) => renderItem(item, index))}
      </ViewerContent>
    </ViewerContainer>
  )
}

export default Viewer
