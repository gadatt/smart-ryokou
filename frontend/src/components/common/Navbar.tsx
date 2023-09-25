import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { getSession } from '@auth0/nextjs-auth0';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import LanguageMenu from './LanguageMenu';

const Navbar = async () => {
  const session = await getSession();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Link href="/">
            <IconButton size="large" edge="start" color="primary" aria-label="menu">
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" color="primary" sx={{ flexGrow: 1 }}>
            Smart旅行
          </Typography>
          <LanguageMenu />
          {!session ? (
            <a href="/api/auth/login">
              <Button color="primary">Login</Button>
            </a>
          ) : (
            <a href="/api/auth/logout">
              <Button color="primary">Logout</Button>
            </a>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;