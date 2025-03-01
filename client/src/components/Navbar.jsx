import { AddRounded, ExploreRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components'

const NavbarContainer = styled.div`
 flex:1;
 background:${({ theme }) => theme.Navbar};
 color:${({ theme }) => theme.text_primary};
 font-weight:bold;
 padding:14px 50px;
 display:flex;
 justify-content:space-between;
 align-items:center;
 box-shadow:0 0 10px rgba(0,0,0,0.15);
 @media only screen and (max-width:600px){
 padding: 10px 12px;
 }
 `;

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split('/');
    return (
        <NavbarContainer>GenAI
            {
                path[1] === 'post' ? (
                    <Button
                        onClick={() => navigate('/')}
                        variant="contained"
                        startIcon={<ExploreRounded style={{ fontSize: "18px" }} />}
                        type='secondary'
                        >
                        Explore Posts
                    </Button>
                ) : (
                    <Button
                        onClick={() => navigate('/post')}
                        variant="contained"
                        startIcon={<AddRounded style={{ fontSize: "18px" }} />}>
                        Create new post
                    </Button>
                )}
    </NavbarContainer>
    );
};


export default Navbar;
