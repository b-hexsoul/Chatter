import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  overlay: {
    backgroundImage:
      "linear-gradient(180deg, rgb(58,141,255, 0.75) 0%, rgb(134,185,255, 0.75) 100%)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexDirection: "column",
    minHeight: "100vh",
    paddingBottom: 145,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    backgroundImage: "url(./images/bg-img.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  heroText: {
    fontSize: 26,
    textAlign: "center",
    color: "white",
    marginTop: 30,
    maxWidth: 300,
  },
}));

const SideHeroImage = () => {
  const classes = useStyles();

  return (
    <Grid item xs={false} sm={4} md={5} className={classes.image}>
      <Box className={classes.overlay}>
        <Hidden xsDown>
          <img width={67} src={""} alt="Chat Bubble" />
          <Hidden smDown>
            <p className={classes.heroText}>
              Converse with anyone with any language
            </p>
          </Hidden>
        </Hidden>
      </Box>
    </Grid>
  );
};

export default SideHeroImage;
