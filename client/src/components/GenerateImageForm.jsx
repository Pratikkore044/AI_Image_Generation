import { AutoAwesome, CreateRounded } from '@mui/icons-material';
import React, { useState } from 'react'
import styled from 'styled-components';
import Button from './button';
import TextInput from './TextInput' 
import { CreatePost, GenerateAIImage } from "../api";
import { useNavigate } from 'react-router-dom';

const Form = styled.div`
flex:1;
padding: 16px 20px;
display:flex;
flex-direction:column;
gap:9%;
justify-content:center;
`;

const Top = styled.div`
display:flex;
flex-direction:column;
gap:6px;
`;

const Title = styled.div`
font-size:28px;
font-weight:500;
color:${({theme})=>theme.text_primary};
`;

const Description = styled.div`
font-size:17px;
font-weight:400;
color:${({theme})=>theme.text_secondary};
`;

const Body = styled.div`
display:flex;
flex-direction:column;
gap:18px;
font-size:12px;
font-weight:400;
color:${({theme})=>theme.text_secondary};
`;

const Actions = styled.div`
flex:1;
display:flex;
gap:8px;
`;

const GenerateImageForm = ({
    post,
    setPost,
    createPostLoading, 
    generateImageLoading,
    setGenerateImageLoading,
    setCreatePostLoading
}) => {
    const [error, setError] = useState("");
    const generateImageFun = async () => {
        setGenerateImageLoading(true);
        await GenerateAIImage({prompt: post.prompt})
        .then((res)=>{
            setPost({...post,photo: res?.data?.photo });
            setGenerateImageLoading(false);
        }).catch((error)=>{
            setError(error?.response?.data?.message);
            setGenerateImageLoading(false);
        });

    };
    const navigate = useNavigate();
    const createPostFun = async () => {
        setCreatePostLoading(true);
        await CreatePost(post)
      .then((res) => {
        setCreatePostLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setCreatePostLoading(false);
      });
    };
  return ( <Form>
    <Top>
        <Title style={{paddingTop:"65px"}}>Generate Image with prompt</Title>
        <Description>
            Write your prompt according to the image you want  
        </Description>
    </Top>
    <Body>
        <TextInput 
        label="Author" 
        placeholder="Enter your name.."
         name="name"
        value={post.name}
        handleChange={(e)=> setPost({...post, name: e.target.value})}
        />
        <TextInput 
        label="Image Prompt" 
        placeholder="Write a detailed prompt about the image you want to generate..."
        textArea 
        rows={8} 
        name="prompt"
        value={post.prompt}
        handleChange={(e)=> setPost({...post, prompt: e.target.value})}
        />
        {error && <div style={{color:'red',marginTop: "10px"}}>{error}</div>}
        <strong>**  You can post the AI Generated image to the Community  **  </strong>
    </Body>
    <Actions>
        <Button 
         text="Generate Image" 
         flex leftIcon={<AutoAwesome/>}
        isLoading={generateImageLoading}
        isDisabled={post.prompt === ""}
        onClick={(e)=>generateImageFun()}
        />
        <Button 
        text="Post Image" 
        flex 
        type="secondary"
        leftIcon={<CreateRounded/>}
        isLoading={createPostLoading}
        isDisabled={post.name === ''|| post.prompt === '' || post.photo === ''}
        onClick={()=>createPostFun()}
        />
    </Actions>
  </Form>
  )
}

export default GenerateImageForm;
