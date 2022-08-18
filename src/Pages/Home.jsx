import React from 'react'
import styled from 'styled-components'
import VideoPage from './VideoPage'

const Wrapper=styled.div`
display:flex;
`

const VideoBox=styled.div`
`
export default function Home(props) {
  return (
  <Wrapper>
<VideoPage type={props.type}></VideoPage>
  </Wrapper>
  )
}
