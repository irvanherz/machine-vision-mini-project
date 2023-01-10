import {
  EyeOutlined
} from '@ant-design/icons'
import { Image } from 'antd'
import { CSSProperties, useState } from 'react'
import styled from 'styled-components'
import { DEFAULT_IMAGE, imageErrorHandler } from '../../libs/common'

type PostImageProps = {
  src?: string
  style?: CSSProperties
}

const Container = styled.div`
.wrapper {
  position: relative;
  width: 100%;
  padding-top: 60%;  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  button {
    opacity: 0;
    cursor: pointer;
    border: none;
    background: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &:hover {
      background: rgba(0,0,0,0.5);
      opacity: 1;
    }
  }
}
`
export default function PostImage ({ src, style }: PostImageProps) {
  const [visible, setVisible] = useState(false)

  const handleToggleVisible = () => setVisible(!visible)

  return (
    <Container style={style}>
      <div className='wrapper'>
        <img src={src} onError={imageErrorHandler}/>
        <button onClick={handleToggleVisible}><EyeOutlined style={{ color: '#FFF' }} /></button>
      </div>
      <Image src={src} fallback={DEFAULT_IMAGE} hidden preview={{ visible, onVisibleChange: setVisible }} />
    </Container>
  )
}
