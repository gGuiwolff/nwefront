import axios from '../axios'
import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
} from "@material-ui/core/";
import MoreIcon from "@material-ui/icons/MoreVert";
import navStyles from "./ui/navStyles";
import { Link } from "react-router-dom";
import FindPeople from "./FindPeople";
import UserAvatar from "./UserAvatar";
import PeopleIcon from "@material-ui/icons/People";
import Badge from "@material-ui/core/Badge";
import { useSelector } from "react-redux";
import MessagesDrawer from "./MessagesDrawer";

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const classes = navStyles();

    const user = useSelector(({ user }) => user);

    const requests = useSelector(
        ({ friends }) => friends && friends.filter((friend) => !friend.accepted)
    );

    const openItem = () => {
        handleMenuClose();
    };

    const handleProfileMenuOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (e) => {
        setMobileMoreAnchorEl(e.currentTarget);
    };

    const logout = async () => {
        axios.get("/logout")
        setTimeout(4000,location.reload(true))
        location.reload(true)
      };

    const menuId = "primary-search-account-menu";

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem component={Link} to="/profile" onClick={openItem}>
                Edit Profile
            </MenuItem>
            <MenuItem component={Link} onClick={logout} to="/teste" >
                Logout
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    {user && (
                        <UserAvatar
                            first_name={user.first_name}
                            last_name={user.last_name}
                            picture={user.profile_picture}
                        />
                    )}
                </IconButton>
                <p>Profile</p>
            </MenuItem>

            <MenuItem onClick={openItem}>
                <IconButton
                    component={Link}
                    to="/friends"
                    aria-label="Show friends"
                    color="inherit"
                >
                    <Badge
                        badgeContent={requests && requests.length}
                        color="secondary"
                    >
                        <PeopleIcon />
                    </Badge>
                </IconButton>
                <p>Friends</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Link
                        to="/"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        <Typography
                            className={classes.title}
                            variant="h6"
                            noWrap
                        >
                            Vegiwe
                        </Typography>
                    </Link>
                    <div className={classes.search}>
                        <FindPeople />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <MessagesDrawer id={user.id} />
                        <IconButton
                            component={Link}
                            to="/friends"
                            aria-label="Show friends"
                            color="inherit"
                        >
                            <Badge
                                badgeContent={requests && requests.length}
                                color="secondary"
                            >
                                <PeopleIcon />
                            </Badge>
                        </IconButton>

                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            {user && <UserAvatar />}
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
};

export default NavBar;