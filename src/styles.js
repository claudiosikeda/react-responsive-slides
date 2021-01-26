import styled from '@emotion/styled'

export const ViewerContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

export const ViewerContent = styled.div`
  opacity: ${(props) => (props.rendered ? '1' : '0')};
  transition: all .3s ease-in-out;
`

export const Mask = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, .5);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`

export const SlideMain = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.current ? '1' : '0')};
  transition: all .2s ease-in-out;
  overflow: auto;

  &.no-scroll {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.scroll {
    display: block;
  }
`

export const SlideContainer = styled.div`
  background-color: #fff;
  border-radius: 5px;
  max-width: 70%;
  min-width: 280px;
  min-height: 200px;
  padding: 20px;
  z-index: 100;
  position: relative;
  transform: ${(props) => (props.current ? 'scale(1)' : 'scale(.4)')};
  transition: transform .2s ease-in-out;

  &.no-scroll {
    max-height: 80%;
  }

  &.scroll {
    margin: 40px auto;
    height: ${(props) => `${props.scrollContentHeight}px`};
  }
`

export const SlideContent = styled.div`
  background-color: #fff;
  max-width: 800px;
  margin: 0 auto;
  height: ${(props) => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.current ? '1' : '0')};
  transition: opacity .1s ease-in-out;
`

export const SlideText = styled.div`
  padding-top: 5px;
  max-width: ${(props) => {
    if (props.textWidth > 800) return `${props.textWidth}px`
    if (props.textWidth === 0) return 'initial'
    return '800px'
  }};
  margin: 0 auto;
  animation: fadeText .4s forwards;

  @keyframes fadeText {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`

export const SlideImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  animation: fadeImage .8s forwards;
  display: ${(props) => (props.loaded ? 'block' : 'none')};

  @keyframes fadeImage {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`

export const LoaderContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

export const LoaderContent = styled.div`
  background-color: #fff;
  border-radius: 5px;
  max-width: 80%;
  max-height: 80%;
  min-width: 280px;
  min-height: 200px;
  padding: 20px 30px;
  z-index: 100;
  position: relative;
  transform: ${(props) => (props.show ? 'scale(1)' : 'scale(1.8)')};
  opacity: ${(props) => (props.show ? '1' : '0')};
  transition: all .1s ease-in-out;
`

export const ImagePlaceholderContainer = styled.div`
  display: block;
  background-color: rgb(230, 230, 230);
  height: 200px;
  width: 280px;
  position: relative;
  overflow: hidden;

  div {
    border: solid 3px #fff;
    width: 30px;
    height: 30px;
    background-color: rgb(230, 230, 230);
    position: fixed;
    margin: 85px 115px;
  }

  div:first-of-type {
    margin: 75px 125px;
    z-index: 1;
  }
  
  &:before {
    animation: load 1.5s infinite cubic-bezier(0.4, 0.0, 0.2, 1);
    content: '';
    background: linear-gradient(to right, transparent 0%, #f1f1f1 50%, transparent 100%);
    display: block;
    height: 100%;
    left: -150px;
    position: absolute;
    top: 0;
    width: 150px;
  }

  @keyframes load {
    from {
      left: -150px;
    }
      
    to {
      left: 100%;
    }
  }
`
