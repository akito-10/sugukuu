import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Card,
  Typography,
  Grid,
} from "@material-ui/core";

type Props = {
  shopName: string;
  shopNameKana: string;
  image: string;
  pr: string;
  shopUrl: string;
  nextShopCard: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      marginLeft: "auto",
      marginRight: "auto",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    link: {
      textDecoration: "none",
    },
    changeButton: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  })
);

const ShopCard: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={props.shopName} subheader={props.shopNameKana} />
      <CardMedia
        className={classes.media}
        component="img"
        src={props.image}
        title="店の画像"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.pr}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="a"
          target="blank"
          href={props.shopUrl}
          className={classes.link}
        >
          この店の公式サイトはこちら
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
        >
          <Button variant="contained" color="primary">
            この店にする
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.changeButton}
            onClick={props.nextShopCard}
          >
            店を変える
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ShopCard;
