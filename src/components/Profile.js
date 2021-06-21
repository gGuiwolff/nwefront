import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "../axios";
import "./styles/images.css";
import { Typography, Box } from "@material-ui/core/";
import Bio from "./Bio";
import { ListImageFeed } from './Listfeed'

const Profile = ({
    classes,
    first_name,
    last_name,
    bio,
    profile_picture = "/assets/default_profile_pic.jpg",
}) => {
    return (
        <Box
            style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1rem",
            }}
        >
            <img
                className={classes.ProfilePic}
                src={profile_picture}
                alt={`${first_name} ${last_name}`}
            />
            <h1 className="">Post uma Imagem</h1>
            <Typography
                component="h1"
                variant="h5"
                style={{ textAlign: "center" }}
            >
                {first_name} {last_name}
            </Typography>
            <Bio bio={bio} classes={classes} />
            <div className ="gallery-item" id="app"></div>
            {/*<ListImageFeed />*/}
        </Box>
    );
};

export default Profile;
