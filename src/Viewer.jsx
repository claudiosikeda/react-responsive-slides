import React, { useState } from 'react'
import Slide from './Slide.jsx'
import Spinner from './Spinner.jsx'
import {
  Mask,
  ViewerContainer,
  ViewerContent,
  LoaderContainer,
  LoaderContent
} from './styles.js'

function Viewer (props) {
  const {
    slides,
    loader: Loader,
    header,
    footer,
    currentSlide,
    onImageClick
  } = props

  const [rendered, setRendered] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  const onRendered = (index) => {
    if (index === 0) {
      setRendered(true)
      setTimeout(() => {
        setShowLoader(false)
      }, 800)
    }
  }

  const renderSpinner = () => {
    if (Loader) {
      return (<Loader />)
    }

    return (<Spinner />)
  }
  
  const renderLoader = () => (
    <LoaderContainer>
      <LoaderContent show={!rendered}>
        {renderSpinner()}
      </LoaderContent>
    </LoaderContainer>
  )

  const renderItem = (slide, index) => (
    <Slide
      key={index}
      index={index}
      slide={slide}
      current={index === currentSlide}
      onRendered={onRendered}
      header={header}
      footer={footer}
      onImageClick={onImageClick}
    />
  )

  return (
    <ViewerContainer>
      <Mask />
      {showLoader ? renderLoader() : null}
      <ViewerContent rendered={rendered}>
        {slides.map((item, index) => renderItem(item, index))}
      </ViewerContent>
    </ViewerContainer>
  )
}

export default Viewer
