import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CacheProvider } from '@emotion/core'
import createCache from '@emotion/cache'
import Slide from './Slide'
import Spinner from './Spinner'
import {
  Mask,
  ViewerContainer,
  ViewerContent,
  LoaderContainer,
  LoaderContent,
} from './styles'

function Viewer(props) {
  const {
    slides,
    loader: Loader,
    header,
    footer,
    currentSlide,
    onImageClick,
  } = props

  const [rendered, setRendered] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const [cache, setCache] = useState(null)
  const containerRef = useRef()

  useEffect(() => {
    setCache(createCache({
      key: 'slide',
      container: containerRef.current,
    }))
  }, [])

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

  const renderContent = () => (
    <CacheProvider value={cache}>
      <Mask />
      {showLoader ? renderLoader() : null}
      <ViewerContent rendered={rendered}>
        {slides.map((item, index) => renderItem(item, index))}
      </ViewerContent>
    </CacheProvider>
  )

  return (
    <div style={{
      position: 'fixed',
      height: '100%',
      width: '100%',
      top: '0',
      left: '0',
    }}
    >
      <div ref={containerRef} />
      <ViewerContainer>
        {cache ? renderContent() : null}
      </ViewerContainer>
    </div>
  )
}

Viewer.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
  loader: PropTypes.func,
  header: PropTypes.func,
  footer: PropTypes.func,
  currentSlide: PropTypes.number.isRequired,
  onImageClick: PropTypes.func,
}

Viewer.defaultProps = {
  loader: null,
  header: () => null,
  footer: () => null,
  onImageClick: () => null,
}

export default Viewer
