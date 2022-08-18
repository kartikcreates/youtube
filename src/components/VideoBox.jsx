import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VideoImg from '../public/videoimg.jpg'
import ChannelImg from '../public/channelimg.jpg'
import { format} from 'timeago.js';
import axios from 'axios';

const Container=styled.div`
display:flex;
flex-direction:column;
width:300px;
height:190px;
`
const Videoimage=styled.img`
margin:10px;
width:250px;
height:115px;`

const Description=styled.div`
display:flex;
gap:15px;

`
const ChannelImage=styled.img`
margin-left:20px;
height:30px;
width:30px;
border-radius:40px;`

const ChilDesc=styled.div`

display:flex;
flex-direction:column;
`

const VideoTitle=styled.div`
font-size:17px;`

const ChannelName=styled.div`
margin-top:10px;
font-size:12px;
`
const ViewandTime=styled.div`
display:flex;
justify-content: space-between;
font-size:15px;
`
const ViewsCount=styled.div`
`
const UploadTime=styled.div`
`
export default function VideoBox(props) {
  const [channel,setchannel]=useState({});
  // const [isloading,setloading]=useState(true);
  // const [isError,setError]=useState(false);
useEffect(()=>{
// setloading(true);
async function getchannel(){
const res=await axios.get('http://localhost:8001/api/user/find/'+props.videodata.userId)
console.log(res.data);
setchannel(res.data)

}
getchannel()

},[props.videodata.userId])

  return (
    <Container>
        <Videoimage src={props.videodata.imgurl?props.videodata.imgurl:VideoImg}></Videoimage>
        <Description>
            <ChannelImage  referrerpolicy="no-referrer" src={channel?channel.img:ChannelImg}>
            </ChannelImage>


            <ChilDesc>
                <VideoTitle>{props.videodata.title}</VideoTitle>
                <ChannelName>{channel?channel.name:'channel_name'} <CheckCircleOutlineIcon style={{fontSize:'small'}}/></ChannelName>
                <ViewandTime>
                    <ViewsCount>{props.videodata.views} views</ViewsCount> • 
                    <UploadTime>{format(props.videodata.createdAt)}</UploadTime>
                </ViewandTime>

            </ChilDesc>

        </Description>


    </Container>



  )
}
