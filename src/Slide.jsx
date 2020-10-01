import React, {
  useState,
  useLayoutEffect,
  useRef,
  useEffect,
} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledSlideContainer = styled.div`
  transform: ${(props) => (props.showSlide ? 'scale(1)' : 'scale(0)')};
  opacity: ${(props) => (props.showSlide ? '1' : '0')};
  transition: transform .2s ease-in-out, opacity .25s ease-in-out;
  padding: 5px 20px;

  &.modal {

    .header {
      animation: fade .8s forwards;
      opacity: 0;
    }

    .footer {
      animation: fade .8s forwards;
      opacity: 0;
    }

    @keyframes fade {
      0%, 30% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  }
`

const StyledImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  cursor: zoom-in;
  opacity: ${(props) => (props.loaded ? '1' : '0')};
  transition: opacity .8s ease-in-out;
`

const StyledMedia = styled.div`
  height: ${(props) => props.imageHeight};
  text-align: center;
  width: 100%;
  overflow: hidden;
  position: relative;
`

const StyledVideo = styled.div`
  margin: 0 auto;
  
  @media (min-width: 768px) {
    width: 600px;
    height: 340px;
  }
`

const StyledText = styled.div`
  padding: 30px 20px 0 20px;
`

const MODAL_SIZE_PERCENT = 80
const MODAL_PADDING = 140
const TABLET_SIZE = 768
const WIDTH_DISCOUNT = 40

const Slide = ({ slide, onRendered, header: Header, footer: Footer, current }) => {
  const [height, setHeight] = useState(0)
  const [showImage, setShowImage] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const textRef = useRef()
  const slideRef = useRef()

  useEffect(() => {
    if (loaded) {
      onRendered()
    }
  }, [loaded, slide])

  useLayoutEffect(() => {
    if (!slide.image) {
      setLoaded(true)
    }
  }, [onRendered, slide])

  const setImageHeight = () => {
    if (!slide.image) return
    const slideImage = new Image()
    slideImage.src = slide.image
    slideImage.onload = () => {
      const windowHeight = window.innerHeight
      const windowWidth = window.innerWidth

      const textHeight = textRef.current ? textRef.current.offsetHeight : 0
      const modalHeight = (windowHeight / 100) * MODAL_SIZE_PERCENT
      let imgHeight = modalHeight - textHeight - MODAL_PADDING
      imgHeight = imgHeight > slideImage.height ? slideImage.height : imgHeight
      
      setHeight(() => {
        if (windowWidth <= TABLET_SIZE) {
          if (slideImage.height > slideImage.width) {
            return `${imgHeight - WIDTH_DISCOUNT}px`
          }

          return modalHeight < imgHeight ? `${imgHeight}px` : 'initial'
        }

        return `${imgHeight}px`
      })
      setLoaded(true)
    }
  }

  const onClickImage = () => {
    setShowImage(!showImage)
  }

  const renderVideo = (src) => (
    <StyledMedia>
      <StyledVideo>
        <iframe
          width="100%"
          height="100%"
          src={src}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        >
        </iframe>
      </StyledVideo>
    </StyledMedia>
  )

  const renderImage = () => (
    <StyledMedia className="img" imageHeight={height}>
      <StyledImage
        src={slide.image}
        alt={slide.image}
        onClick={onClickImage}
        onLoad={setImageHeight}
        loaded={loaded}
      />
    </StyledMedia>
  )

  const renderMedia = () => {
    if (slide.video) {
      return renderVideo(slide.video)
    }

    if (slide.image) {
      return renderImage(slide.image)
    }

    return null
  }

  const renderText = () => {
    if (!slide.text) {
      return (
        <div ref={textRef} />
      )
    }

    return (
      <StyledText ref={textRef}>
        {slide.text}
      </StyledText>
    )
  }

  const renderSpinner = () => (
    <>
      loading...
    </>
  )

  return (
    <StyledSlideContainer showSlide={current} ref={slideRef}>
      <div className="header">
        <Header />
      </div>
      {loaded ? null : renderSpinner()}
      {renderMedia()}
      {renderText()}
      <div className="footer">
        <Footer />
      </div>
    </StyledSlideContainer>
  )
}

Slide.propTypes = {
  slide: PropTypes.objectOf(PropTypes.any).isRequired,
  onRendered: PropTypes.func.isRequired,
}

export default Slide
