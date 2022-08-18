import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import styled from 'styled-components';
const ChannelImage=styled.img`
margin-left:20px;
height:30px;
width:30px;
border-radius:40px;`
export default function UserImg(props) {
    const [avatar,setavatar]=useState('');
useEffect(()=>{
    axios.get('http://localhost:8001/api/user/find/'+props.id).then((res)=>{
        console.log(res.data.img)
        setavatar(res.data.img)
    })
})
  return (
    <ChannelImage referrerpolicy="no-referrer" src={avatar}></ChannelImage>
  )
}
