import React, { useState, useRef, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import ImagePlaceholder from './ImagePlaceholder'
import {
  SlideMain,
  SlideContainer,
  SlideContent,
  SlideText,
  SlideImage,
} from './styles'

function Slide(props) {
  const {
    slide,
    current,
    index,
    onRendered,
    header: Header,
    footer: Footer,
    onImageClick,
  } = props

  const mainRef = useRef()
  const contentRef = useRef()
  const containerRef = useRef()
  const mediaRef = useRef()
  const [height, setHeight] = useState('initial')
  const [imageLoaded, setImageLoaded] = useState(false)
  const [textWidth, setTextWidth] = useState(0)
  const [rendered, setRendered] = useState(false)
  const [classScroll, setClassScroll] = useState('no-scroll')
  const [scrollContentHeight, setScrollContentHeight] = useState(0)

  const calculateScroll = useCallback(() => {
    const { scrollHeight, offsetHeight } = containerRef.current
    if (scrollHeight > offsetHeight) {
      setClassScroll('scroll')
      setScrollContentHeight(scrollHeight)
    }
  }, [])

  const calculateMediaHeight = useCallback(() => {
    if (window.innerWidth < 500) {
      return setHeight('auto')
    }

    const { scrollHeight, offsetHeight } = containerRef.current

    if (scrollHeight !== offsetHeight) {
      const overflow = scrollHeight - offsetHeight + 5
      const contentHeight = contentRef.current.offsetHeight
      let newHeight = contentHeight - overflow
      newHeight = newHeight < 300 ? 'auto' : newHeight

      return setHeight(`${newHeight}px`)
    }

    return null
  }, [])

  useEffect(() => {
    if (rendered) {
      calculateScroll()
    }
  }, [rendered, calculateScroll])

  useEffect(() => {
    if (slide.image) {
      setRendered(imageLoaded)
    } else {
      setRendered(true)
    }
  }, [slide, imageLoaded])

  useEffect(() => {
    if (slide.video || (slide.image && imageLoaded)) {
      setTextWidth(mediaRef.current.offsetWidth)
      return onRendered(index)
    }

    if (slide.image) {
      calculateScroll()
      return setTextWidth(800)
    }

    setTextWidth(800)
    return onRendered(index)
  }, [slide, contentRef, onRendered, imageLoaded, index, calculateScroll])

  useEffect(() => {
    if (imageLoaded) calculateMediaHeight()
  }, [imageLoaded, calculateMediaHeight])

  const loadedImage = () => {
    setImageLoaded(true)
  }

  const renderImage = () => (
    <>
      { imageLoaded ? null : <ImagePlaceholder /> }
      <SlideImage
        ref={mediaRef}
        src={slide.image}
        style={{ maxWidth: '100%', maxHeight: '100%' }}
        onLoad={loadedImage}
        loaded={imageLoaded}
        alt={slide.imageAlt || slide.image}
        onClick={() => onImageClick(slide.image)}
      />
    </>
  )

  const renderVideo = () => (
    <iframe
      title={slide.video}
      ref={mediaRef}
      width="560px"
      height="315px"
      src={slide.video}
      frameBorder="0"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )

  const renderText = () => (
    <SlideText textWidth={textWidth}>
      {slide.text}
    </SlideText>
  )

  const renderMedia = () => {
    if (slide.image) return renderImage()
    if (slide.video) return renderVideo()
    return null
  }

  return (
    <SlideMain
      current={current}
      ref={mainRef}
      className={classScroll}
    >
      <SlideContainer
        ref={containerRef}
        current={current}
        className={classScroll}
        scrollHeight={scrollContentHeight}
      >
        <Header />
        <SlideContent
          ref={contentRef}
          current={current}
          height={height}
        >
          {renderMedia()}
        </SlideContent>
        {slide.text ? renderText() : null}

        <Footer />
      </SlideContainer>
    </SlideMain>
  )
}

Slide.propTypes = {
  slide: PropTypes.objectOf(PropTypes.any).isRequired,
  current: PropTypes.bool,
  index: PropTypes.number.isRequired,
  onRendered: PropTypes.func.isRequired,
  header: PropTypes.func,
  footer: PropTypes.func,
  onImageClick: PropTypes.func,
}

Slide.defaultProps = {
  current: 0,
  header: () => null,
  footer: () => null,
  onImageClick: () => null,
}

export default Slide
