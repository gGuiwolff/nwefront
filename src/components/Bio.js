import { Typography } from "@material-ui/core/";

const Bio = ({ bio, classes }) => {
    return (
        <section>
            <Typography className={classes.biotext}>{bio}</Typography>
        </section>
    );
};

export default Bio;
