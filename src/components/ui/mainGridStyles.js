const mainGridStyles = (theme) => ({
    root: {
        height: "100%",
    },
    image: {
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    paperEdit: {
        margin: theme.spacing(0, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    ProfilePic: {
        width: "350px",
        margin: "0 auto !important",
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    biotext: {
        textAlign: "center",
        whiteSpace: "pre-line",
    },
});

export default mainGridStyles;
