import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useReducer,
} from 'react'
import PropTypes from 'prop-types'
import Slide from './Slide.jsx'
import * as Styled from './styles/StyledViewer'
import { ThemeProvider } from 'styled-components'

function Viewer({ slides: originalSlides, header, footer, currentSlideIndex }) {
  const modalRef = useRef()
  const slidesRef = useRef()
  const [slideDimensions, setSlideDimentions] = useState({ width: 300, height: 300 })
  const [rendered, setRendered] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const [slides, setSlides] = useState([])

  useEffect(() => {
    const withIndex = originalSlides.map((item, index) => {
      return {
        ...item,
        index
      }
    })
    setSlides(withIndex) 
  }, [originalSlides])

  useEffect(() => {
    if (currentSlideIndex >= slides.length) {
      return setCurrentSlide(slides.length - 1)
    }

    if (currentSlideIndex < 0) {
      return setCurrentSlide(0)
    }

    return setCurrentSlide(currentSlideIndex)
  }, [currentSlideIndex, slides])

  useLayoutEffect(() => {
    if (currentSlide >= 0 && rendered) {
      const nextSlide = slidesRef.current.children[currentSlideIndex]
      if (!nextSlide) return
      
      modalRef.current.classList.remove('modal')
      setTimeout(() => {
        modalRef.current.classList.add('modal')
      }, 1)

      setSlideDimentions({
        width: nextSlide.offsetWidth,
        height: nextSlide.offsetHeight
      })
    }
  }, [currentSlide, rendered])

  const onRendered = () => {
    setRendered(true)
    setShowAll(true)
  }

  const renderSlide = (slide) => (
    <Styled.Slide key={slide.index} visible={slide.index === currentSlide}>
      <Slide
        slide={slide}
        onRendered={onRendered}
        header={header}
        footer={footer}
        current={currentSlide === slide.index}
      />
    </Styled.Slide>
  )

  const getSlides = () => {
    if (!slides.length) return []
    if (showAll) return slides
    return [slides[0]]
  }

  return (
    <ThemeProvider theme={{}}>
      <Styled.Mask />
      <Styled.Viewer>
        <Styled.MaskModal
          modalWidth={slideDimensions.width}
          modalHeight={slideDimensions.height}
        >
          {rendered ? null : 'Loading...'}
        </Styled.MaskModal>
        <Styled.Modal
          ref={modalRef}
          showModal={rendered}
          className="modal"
        >
          <Styled.Slides ref={slidesRef}>
            {getSlides().map(renderSlide)}
          </Styled.Slides>

        </Styled.Modal>
      </Styled.Viewer>
    </ThemeProvider>
  )
}

Viewer.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object)
}

export default Viewer
