import React, { useState, useRef } from 'react'
import {
  SlideMain,
  SlideContainer,
  SlideContent,
  SlideText
} from './styles.js'

function Slide (props) {
  const {
    slide,
    onPrevious,
    onNext,
    current,
  } = props
  
  const contentRef = useRef()
  const containerRef = useRef()
  const [height, setHeight] = useState('initial')
  
  const loadedImage = () => {
    const scrollHeight = containerRef.current.scrollHeight
    const offsetHeight = containerRef.current.offsetHeight

    if (scrollHeight !== offsetHeight) {
      const overflow = scrollHeight - offsetHeight + 5
      const contentHeight = contentRef.current.offsetHeight
      const height = contentHeight - overflow

      setHeight(`${height}px`)
    }
  }

  return (
    <SlideMain current={current}>
      <SlideContainer ref={containerRef} current={current}>
        <div>
          <h3>Meus slides</h3>
        </div>

        <SlideContent ref={contentRef} current={current} height={height}>
          {slide.image ? (
            <img
              src={slide.image}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              onLoad={loadedImage}
            />
          ) : null}
          {slide.video ? (
            <iframe
              width="100%"
              height="100%"
              src={slide.video}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            >
            </iframe>
          ) : null}
        </SlideContent>
        
        {slide.text ? (
          <SlideText>
            {slide.text}
          </SlideText>
        ) : null}
        
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
