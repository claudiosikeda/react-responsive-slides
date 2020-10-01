import styled from 'styled-components'

export const Mask = styled.div`
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 600;
`

export const Viewer = styled.div`
  align-items: center;
  display: flex;
  font-size: 16px;
  height: 100%;
  justify-content: center;
  left: 0;
  margin: 0 auto;
  overflow: auto;
  position: fixed;
  text-align: left;
  top: 0;
  width: 100%;
  z-index: 700;
`

export const Modal = styled.div`
  border-radius: 5px;
  max-height: 80%;
  max-width: 80%;
  overflow: auto;
  opacity: ${(props) => (props.showModal ? '1' : '0')};
  transition: all .8s ease-in-out;
`

export const MaskModal = styled.div`
  background-color: #fff;
  position: absolute;
  transition: all .2s ease-in-out;
  border-radius: 5px;
  width: ${(props) => `${props.modalWidth}px`};
  height: ${(props) => `${props.modalHeight}px`};
  max-height: 90%;
  min-width: 300px;
  min-height: 300px;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-items: center;
`

export const Header = styled.div`
  display: grid;
  grid-template-columns:  auto 30px;
  opacity: 0;
`

export const Slides = styled.ul`
  position: relative;
  padding: 0;
  margin: 0;
  list-style: none;
  z-index: 10;
`
export const Slide = styled.li`
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  position: ${(props) => (props.visible ? 'block' : 'fixed')};
  opacity: ${(props) => (props.visible ? '10' : '0')};
`

export const SlideNav = styled.ul`
  display: grid;
  grid-template-columns: 50% 50%;
  margin: 0;
  padding: 30px 0 10px 0;
  opacity: 0;

  li:last-child {
    flex-direction: row-reverse;
  }
`

export const SlideNavItem = styled.li`
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  display: flex;
  font-weight: bold;
  list-style: none;

  &.disabled {
    color: ${(props) => props.theme.colors.default};
  }
`
