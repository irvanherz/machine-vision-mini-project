import { Layout } from 'antd'
import { ReactNode } from 'react'
import styled from 'styled-components'

type BlankLayoutProps = {
  children: ReactNode
}

const StyledLayout = styled(Layout)`
min-height: 100vh;
`
export default function BlankLayout ({ children }: BlankLayoutProps) {
  return (
    <StyledLayout>
      {children}
    </StyledLayout>
  )
}
