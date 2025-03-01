import { CircularProgress } from '@mui/material';
import React from 'react'
import styled from 'styled-components';

const GeneratedImageCardComponent = styled.div`
flex:1;
min-height:300px;
display:flex;
gap:16px;
flex-direction:column;
align-items: center;
justify-content: center;
padding: 16px;
border: 2px dashed ${({theme})=>theme.yellow};
color:${({theme})=>theme.arrow},0.8;
border-radius:20px;
`;

const Image = styled.img`
max-width:100%;
max-height:100%;
object-fit:contain;
border-radius:24px;
background: ${({theme})=>theme.black +50};
`;

 const GeneratedImageCard = ({src,loading}) => {
  return (
    <GeneratedImageCardComponent>
        {
            loading ? ( <>
            <CircularProgress style={{color:"inherit", width: "24px", height:"24px"}}/>
            Generating Your Image ...
            </> ) : (
                <>
                {
                    src ? <Image src={src} alt='Generated AI Image'/> : <>Write a prompt to generate image</>
                }
                </>
            )
        }
    </GeneratedImageCardComponent>
  )
}

export default GeneratedImageCard;