import { createMuiTheme } from "@material-ui/core/styles";

const mainTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#48dbc8",
        },
        secondary: {
            main: "rgba(280,280,280,0.92)",
        },
    },
    typography: {
        fontFamily: "'Montserrat', sans-serif",
    },
    props: {
        MuiTextField: {
            margin: "dense",
            variant: "outlined",
            InputLabelProps: {
                shrink: true,
            },
        },
    },
});

export default mainTheme;
