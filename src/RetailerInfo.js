import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        margin: 4,
        [theme.breakpoints.up('sm')]: {
            width: 320,
            position: 'absolute',
            right: 4,
            top: 24,
            margin: 0,
        }
    },
    card: {
        display: 'flex',
        justifyContent: 'center'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        padding: '12px !important',
    },
    cover: {
        width: '50%',
        height: 'auto',
        backgroundSize: 'contain'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    cardContentRoot: {
        padding: 12,
    },
    retailerName: {
        alignSelf: 'center',
        padding: 4,
        textAlign: 'center',
        backgroundImage: 'linear-gradient(90deg, #F79533 0%, #F37055 15%, #EF4E7B 30%, #A166AB 44%, #5073B8 58%, #1098AD 72%, #07B39B 86%, #6DBA82 100%)',
        backgroundSize: 'cover',
        '-webkit-background-clip': 'text',
        textFillColor: 'transparent',
    }
});

class RetailerInfo extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    {/* <CardMedia
                        className={classes.cover}
                        image="http://www.westorangejewelers.com/wp-content/uploads/2014/02/WOJBLK-Web.jpg"
                        title="West Orange Jewelers"
                    /> */}
                    <Typography variant="subheading" component="h3" className={classes.retailerName}>
                        West Orange<br/>Jewelers
                    </Typography>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            {/* <Typography variant="subheading">
                                West Orange Jewelers
                            </Typography> */}
                            <Typography variant="caption" color="textSecondary">
                                US HWY 46, Suite 180W
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                Parsippany, NJ, 
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                07054, US
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </div>
        );
    }
}

RetailerInfo.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RetailerInfo);