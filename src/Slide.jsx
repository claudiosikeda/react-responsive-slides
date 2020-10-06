import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
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

  const contentRef = useRef()
  const containerRef = useRef()
  const mediaRef = useRef()
  const [height, setHeight] = useState('initial')
  const [imageLoaded, setImageLoaded] = useState(false)
  const [textWidth, setTextWidth] = useState(0)

  useEffect(() => {
    if (slide.video || (slide.image && imageLoaded)) {
      setTextWidth(mediaRef.current.offsetWidth)
      return onRendered(index)
    }

    if (slide.image) {
      return setTextWidth(800)
    }

    setTextWidth(800)
    return onRendered(index)
  }, [slide, contentRef, onRendered, imageLoaded, index])

  const loadedImage = () => {
    setImageLoaded(true)
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
  }

  const renderImage = () => (
    <SlideImage
      ref={mediaRef}
      src={slide.image}
      style={{ maxWidth: '100%', maxHeight: '100%' }}
      onLoad={loadedImage}
      loaded={imageLoaded}
      onClick={() => onImageClick(slide.image)}
    />
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
    <SlideMain current={current}>
      <SlideContainer ref={containerRef} current={current}>
        <Header />
        <SlideContent ref={contentRef} current={current} height={height}>
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
