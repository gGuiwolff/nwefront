import { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
    IconButton,
    Avatar,
    CircularProgress,
    TextField,
    makeStyles,
} from "@material-ui/core";
import axios from "../axios";
import { Link } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";

const FindPeople = () => {
    const style = makeStyles((theme) => ({
        inputRoot: {
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("xs")]: {
                width: "100%",
            },
            [theme.breakpoints.up("sm")]: {
                width: "85%",
            },
            [theme.breakpoints.up("md")]: {
                width: "130%",
            },
            borderRadius: theme.shape.borderRadius,
            backgroundColor: "rgba(255,255,255,0.95)",
        },
    }));
    const classes = style();
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => getLatestUsers(), []);
    useEffect(() => !open && getLatestUsers(), [open]);

    const handleChange = async (e) => {
        if (!e.target.value) {
            return getLatestUsers();
        }
        try {
            const { data } = await axios.get(`/users/search/${e.target.value}`);
            const { users } = data;
            users.length >= 1 && setOptions(users.map((user) => user));
        } catch (err) {
            console.log(err);
        }
    };

    const getLatestUsers = async () => {
        try {
            const { data } = await axios.get(`/users/latest`);
            const { users } = data;
            setOptions(users.map((user) => user));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Autocomplete
            id="find-users"
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionLabel={(option) =>
                `${option.first_name} ${option.last_name}`
            }
            getOptionSelected={(option, value) => option.value === value.value}
            options={options}
            noOptionsText={"User not found"}
            loading={loading}
            style={{
                width: 270,
                border: "none",
                display: "flex",
                justifyContent: "flex-end",
            }}
            renderOption={(option) => {
                return (
                    <Link
                        style={{
                            textDecoration: "none",
                            color: "black",
                            fontSize: "0.8rem",
                        }}
                        to={"/user/" + option.id}
                    >
                        <IconButton color="primary">
                            <Avatar
                                alt={(option.last_name, option.first_name)}
                                src={option.profile_picture}
                                className={classes.large}
                            />
                        </IconButton>
                        {option.first_name} {option.last_name}
                    </Link>
                );
            }}
            renderInput={(params) => {
                return (
                    <TextField
                        {...params}
                        classes={{
                            root: classes.inputRoot,
                        }}
                        onChange={(e) => handleChange(e)}
                        placeholder="Procurar Pessoas"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                );
            }}
        />
    );
};

export default FindPeople;
