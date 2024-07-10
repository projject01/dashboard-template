import { useState, useEffect } from 'react';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography, ListItemButton, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import logoutResource from '../../services/api/logoutResource';
import React from 'react';

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const screenSize = useMediaQuery('(max-width: 650px)');
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const theme = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = async () => {
    const successLogout = await logoutResource.logout()
    if (successLogout) navigate('/dash')
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const linkCategorys = {
    data: [
      { name: 'types', to: '/dash/types' },
      { name: 'records', to: '/dash/records' },
    ],
    system: [
      { name: 'users', to: '/dash/users' },
    ]
  }

  return (
    <Box
      sx={{
        width: isMobile ? 64 : 240,
        borderRight: '1px solid #ccc',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        zIndex: 1000,
      }}
    >
      <ListItem
        sx={{
          justifyContent: 'center',
          py: 2,
          borderBottom: '1px solid #ddd',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: screenSize ? "12px" : "18px" }}>
          Dashboard
        </Typography>
      </ListItem>

      <List>
        {Object.entries(linkCategorys).map(([category, links]) => (
          <React.Fragment key={category}>
              <React.Fragment>
                <ListItem sx={{ flexWrap: 'wrap', p: 0 }}>
                  <ListItemText
                    primary={category}
                    primaryTypographyProps={{
                      textTransform: 'capitalize',
                      fontSize: 18,
                      sx: { opacity: 0.7 },
                    }}
                    sx={{ pl: 4.75, display: screenSize ? "none" : "block" }}
                  />
                </ListItem>
                <List sx={{ width: '100%', display: 'contents' }}>
                  {links.map(({ name, to }) => (
                    <ListItem
                      key={name}
                      disablePadding
                      sx={{
                        margin: screenSize ? "0px 0px 0px -38px" : "0px 0px 0px -38px",
                        position: 'relative',
                        opacity: 0.7,
                        '&:hover': {
                          opacity: 1,
                          '.MuiTypography-root': {
                            fontWeight: 700,
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            width: 6,
                            backgroundColor: 'primary.contrastText',
                            zIndex: 1,
                          },
                        },
                      }}
                    >
                      <ListItemButton
                        key={name}
                        LinkComponent="a"
                        href={to}
                        sx={{
                          pl: 4.75,
                          paddingBlock: 1.3125,
                          '&:hover': { backgroundColor: 'primary.light' },
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(to);
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: '32px', display: screenSize ? "none" : "block"}}>
                          <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                            <rect width="6" height="6" rx="6" fill={theme.palette.primary.contrastText} />
                          </svg>
                        </ListItemIcon>
                        <ListItemText
                          primary={isMenuOpen ? name : ''}
                          primaryTypographyProps={{
                            textTransform: 'capitalize',
                            fontSize: 18,
                            fontWeight: 300,
                          }}
                          sx={{ display: screenSize ? "block" : "block"}}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </React.Fragment>
          </React.Fragment>
        ))}
      </List>
        <ListItem
          sx={{
            position: 'absolute',
            margin: '0px 0px 0px 0px',
            bottom: 0,
            left: 0,
            width: '100%',
            borderTop: '1px solid #ddd',
            paddingLeft: screenSize ? "20px" : "45px"
          }}
          >
          <Button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ display: screenSize ? "none" : "block", color:'white'}}/>
          </Button>
        </ListItem>
    </Box>
  );
};

export default Sidebar;