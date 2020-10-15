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
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.current ? '1' : '0')};
  transition: all .2s ease-in-out;
`

export const SlideContainer = styled.div`
  background-color: #fff;
  border-radius: 5px;
  max-width: 80%;
  max-height: 80%;
  min-width: 280px;
  min-height: 200px;
  padding: 20px 30px;
  z-index: 100;
  position: relative;
  overflow: auto;
  transform: ${(props) => (props.current ? 'scale(1)' : 'scale(.4)')};
  transition: transform .2s ease-in-out;
`

export const SlideContent = styled.div`
  height: ${(props) => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.current ? '1' : '0')};
  transition: opacity .1s ease-in-out;
`

export const SlideText = styled.div`
  padding: 20px 0;
  max-width: ${(props) => {
    if (props.textWidth > 800) return `${props.textWidth}px`
    if (props.textWidth === 0) return 'initial'
    return '800px'
  }};
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
