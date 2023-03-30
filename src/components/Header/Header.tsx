import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchAsyncMovies, fetchAsyncShows } from '@/redux/slices/movies';
import { setThemeMode } from '@/redux/slices/settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  Typography,
  Badge,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import {
  StyledAppbar,
  StyledSearchIconWrapper,
  StyledSearch,
  StyledInputBase,
  MaterialUISwitch
} from '@/components/Header/HeaderStyles';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    settings: { themeMode }
  } = useAppSelector((state) => state);

  const [term, setTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLElement>
  ): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = (): void => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = (): void => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleChangeTheme = (): void => {
    dispatch(setThemeMode(themeMode === 'dark' ? 'light' : 'dark'));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (term === '') {
      alert('Please enter search term!');
      return;
    }
    dispatch(fetchAsyncMovies(term)).catch(() => {});
    dispatch(fetchAsyncShows(term)).catch(() => {});
    setTerm('');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <MaterialUISwitch
          onChange={handleChangeTheme}
          defaultChecked
          sx={{ m: 1 }}
        />
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <StyledAppbar>
        <Typography
          variant="h6"
          color="text.secondary"
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          <Link to="/">Movie App</Link>
        </Typography>
        <Box
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
          noValidate
          onSubmit={submitHandler}
        >
          <StyledSearch>
            <StyledSearchIconWrapper>
              <SearchIcon />
            </StyledSearchIconWrapper>
            <StyledInputBase
              placeholder="Search Movies or Shows…"
              inputProps={{ 'aria-label': 'search' }}
              value={term}
              onChange={(e) => {
                setTerm(e.target.value);
              }}
            />
          </StyledSearch>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            sx={{ mr: 1 }}
          >
            <AccountCircle />
          </IconButton>
          <MaterialUISwitch
            onChange={handleChangeTheme}
            defaultChecked
            sx={{ m: 1, mr: 0 }}
          />
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
            sx={{ m: 1, mr: 0 }}
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </StyledAppbar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
