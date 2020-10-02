import React, { useState, useRef, useEffect } from 'react'
import {
  SlideMain,
  SlideContainer,
  SlideContent,
  SlideText,
  SlideImage
} from './styles.js'

function Slide (props) {
  const {
    slide,
    onPrevious,
    onNext,
    current,
    index,
    onRendered,
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
  }, [slide, contentRef, onRendered, imageLoaded])
  
  const loadedImage = () => {
    setImageLoaded(true)
    if (window.innerWidth < 500) {
      return setHeight('auto')
    }

    const scrollHeight = containerRef.current.scrollHeight
    const offsetHeight = containerRef.current.offsetHeight

    if (scrollHeight !== offsetHeight) {
      const overflow = scrollHeight - offsetHeight + 5
      const contentHeight = contentRef.current.offsetHeight
      let height = contentHeight - overflow
      height = height < 300 ? 'auto' : height
      
      setHeight(`${height}px`)
    }
  }

  const renderImage = () => (
    <SlideImage
      ref={mediaRef}
      src={slide.image}
      style={{ maxWidth: '100%', maxHeight: '100%' }}
      onLoad={loadedImage}
      loaded={imageLoaded}
    />
  )

  const renderVideo = () => (
    <iframe
      ref={mediaRef}
      width="560px"
      height="315px"
      src={slide.video}
      frameBorder="0"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    >
    </iframe>
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
        <div>
          <h3>Meus slides</h3>
        </div>

        <SlideContent ref={contentRef} current={current} height={height}>
          {renderMedia()}
        </SlideContent>
        
        {slide.text ? renderText() : null}
        
        <div style={{
            display: 'grid',
            gridTemplateColumns: '50% 50%',
            padding: '20px 0'
          }}>
          <button type="button" onClick={onPrevious}>Voltar</button>
          <button type="button" onClick={onNext}>Avançar</button>
        </div>
      </SlideContainer>
    </SlideMain>
  )
}

export default Slide
