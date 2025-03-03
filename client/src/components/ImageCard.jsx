import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled from 'styled-components';
import { Avatar } from "@mui/material";
import { DownloadRounded } from "@mui/icons-material";
import FileSaver from "file-saver";

const Card = styled.div`
position:relative;
display:flex;
border-radius:20px;
box-shadow:1px 2px 40px 8px ${({ theme }) => theme.black + "60"};
cursor:pointer;
transition:all 0.3s ease;
&:hover {
box-shadow:1px 2px 40px 8px ${({ theme }) => theme.black + "80"};
transform:scale(1.05);
}
&:nth-child(7n+1){
grid-column:auto/span 2;
grid-row:auto/span 2;
}
`;
const HoverOverlay = styled.div`
position:absolute;
top:0;
left:0;
right:0;
bottom:0;
display:flex;
flex-direction:column;
align-items:start;
gap:10px;
backdrop-filter:blur(2px);
background:rgba(0,0,0,0.5);
color:${({ theme }) => theme.white};
transition: opacity 0.3s ease;
border-radius:6px;
justify-content:end;
padding:12px;
opacity: 0;

${Card}:hover & {
opacity:1;
}
`;
const Prompt = styled.div`
  font-weight: 400;
  font-size: 15px;
  color: ${({ theme }) => theme.white};
  text-align: center;
  word-break: break-word;
  padding: 4px;
  
  @media (max-width: 600px) {
    font-size: 9px;
    text-align: start;
    line-height: 1.2;
    padding: 0.5px 0.5px 0px;
  }
`;

const Author = styled.div`
  font-weight: 400;
  font-size: 15px;
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.white};
  width: 100%;
  justify-content: space-between;
  padding: 4px;

  @media (max-width: 600px) {
    font-size: 9px;
    flex-direction: row;
    justify-content: start;
    padding: 0px 0.5px 0.5px;
  }
`;



const ImageCard = ({ item }) => {
  return (
    <Card>
      <LazyLoadImage style={{borderRadius:"12px"}}
        width="100%"
        src={item?.photo} alt={item?.prompt||"Generated Image"} />
      <HoverOverlay>
        <Prompt>{item?.prompt}</Prompt>
        <div style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Author>
            <Avatar sx={{ width: "22px", height: "22px" }}>
              {item?.name[0]}
            </Avatar>
            {item?.name}
          </Author>
          <DownloadRounded
            onClick={() => FileSaver.saveAs(item?.photo, `download.jpg`)}
          />
        </div>
      </HoverOverlay>
    </Card>
  )
}

export default ImageCard;