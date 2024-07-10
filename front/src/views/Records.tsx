import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';
import { ChangeEventHandler, FormEventHandler,useState } from 'react';

const HeaderWrapper = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
`

const Records = () => {
  const isMobile = useMediaQuery('(max-width: 650px)');
  return (
    <main>
      <HeaderWrapper>
        <Typography variant="h1" sx={{ ml: isMobile ? "60px" : "230px"}}>
          Records
        </Typography>
      </HeaderWrapper>
    </main>
  )
}

export default Records;
