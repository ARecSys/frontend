import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

function ProductCategories(props) {
  const { classes } = props;

  const images = [
      {
        url:
          "https://tcwang0509.github.io/pix2pixHD/images/teaser_label.png",
        title: "Computer Vision",
        width: "40%"
      },
      {
        url:
          "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        title: "Networking",
        width: "20%"
      },
      {
        url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUqCdzH68-RwyeoropjfPf_Q7Ok0Vf5g-GLmW9G3wErNVC5pCUGY7g3x8UV91d4dDNRXk&usqp=CAU",
        title: "NLP",
        width: "40%"
      },
      {
        url:
          "https://www.researchgate.net/profile/Jaime-Arias-Almeida/publication/263535205/figure/fig3/AS:392365031346179@1470558521432/Model-checking-graph-for-the-tcc-Structure-shown-in-Figure-47-and-the-formula-62.png",
        title: "Formal Methods",
        width: "38%"
      },
      {
        url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Euclid_flowchart.svg/640px-Euclid_flowchart.svg.png",
        title: "Algorithms & Complexity",
        width: "38%"
      },
      {
        url:
          "https://dataanalyticspost.com/wp-content/uploads/2019/10/HPC_HPDA-scaled.jpg",
        title: "HPC",
        width: "24%"
      },
      {
        url:
          "https://www.digitaluppercut.com/wp-content/uploads/2018/03/network-security.jpg",
        title: "Security",
        width: "40%"
      },
      {
        url:
          "https://www.kindpng.com/picc/m/388-3883239_custom-systems-and-data-silos-integration-solutions-solutions.png",
        title: "Databases",
        width: "20%"
      },
      {
        url:
          "https://acmspot.com/wp-content/uploads/2021/11/Humaan.jpg",
        title: "Human Computer Interaction",
        width: "40%"
      }
    ];

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        Covering the complete CS landscape
      </Typography>
      <div className={classes.images}>
        {images.map((image) => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);
