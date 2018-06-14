import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Payment from 'payment';
import Cards from 'react-credit-cards';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Currency from 'react-currency-formatter';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';


import CurrencyInputFormat from './CurrencyInputFormat';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    flexBasis: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  buttonLink: {
    color: 'inherit',
    textDecoration: 'none'
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    flexDirection: 'row'
  },
  totalPaymentContainer: {
    alignItems: 'center'
  },
  totalPaymentTypo: {
    textAlign: 'right',
    paddingRight: '12px'
  },
  totalPaymentNumbers: {
    textAlign: 'right',
    paddingRight: '16px'
  },
  adhocPayment: {
    maxWidth: '282px',
    height: 28,
    // marginRight: '120px',
    // marginTop: '16px'
  },
  displayFlex: {
    display: 'flex'
  },
  checkboxIcon: {
    marginRight: '4px',
    padding: '4px'
  },
  chequeContainer: {
    background: 'rgb(213,239,245)',
    padding: theme.spacing.unit,
  },
  chequeToName: {
    borderBottom: '1px solid #555',
    lineHeight: '100%',
    paddingTop: 4,
  },
  chequeNumber: {
    marginTop: 8,
    padding: '8px 4px',
    height: 34,
    background: 'transparent',
    boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.2), 0px 0px 1px 0px rgba(0, 0, 0, 0.14), 0px -1px 1px -1px rgba(0, 0, 0, 0.12)',
  },
  adhocPaymentSwitch: {
    marginRight: 0,
    height: 28
  },
  currencyTypo: {
    ...theme.typography.subheading,
    position: 'absolute'
  }
});

class PaymentInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: '',
      name: '',
      expiry: '',
      cvc: '',
      focused: '',
      chequeABANubmer: '',
      chequeBankAccountNumber: '',
      isCardValid: false,
      isFormValid: false,
      paymentType: 'none',
      adhocPayment: 0,
      enableAdhocPayment: false,
    };
  }

  componentDidMount() {
    // Payment.formatCardNumber(document.querySelector('[name="number"]'));
    // Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
    // Payment.formatCardCVC(document.querySelector('[name="cvc"]'));
  }

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      this.setState({
        [target.name]: target.value.replace(/ /g, ''),
      });
    }
    else if (target.name === 'expiry') {
      this.setState({
        [target.name]: target.value.replace(/ |\//g, ''),
      });
    }
    else {
      this.setState({
        [target.name]: target.value,
      });
    }

    this.setState(prevState => {
      let isValid = false;
      if (prevState.paymentType === 'ach') {
        isValid = prevState.chequeABANubmer.length > 0 && prevState.chequeBankAccountNumber.length > 0
      } else {
        isValid = prevState.isCardValid && prevState.name.length > 0 && prevState.expiry.length >= 4 && prevState.cvc.length === 3
      }
      return {
        isFormValid: isValid
      }
    })
  };

  handleTextFieldChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSwitchChange = name => event => {
    this.setState({ [name]: event.target.checked, adhocPayment: 0 });
  };

  handleCallback = (type, isValid) => {
    this.setState(prevState => {
      let isFormValid = isValid && prevState.name.length > 0 && prevState.expiry.length >= 4 && prevState.cvc.length === 3
      return {
        isCardValid: isValid,
        isFormValid: isFormValid
      }
    })
  }

  handlePaymentTypeChange = event => {
    this.setState({ paymentType: event.target.value, isFormValid: false });


    if (event.target.value === 'credit' || event.target.value === 'debit') {
      setTimeout(function(){
        Payment.formatCardNumber(document.querySelector('[name="number"]'));
        Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
        Payment.formatCardCVC(document.querySelector('[name="cvc"]'));
      });
    }
  };

  storeSelectedData = event => {
    localStorage.setItem('paidData', JSON.stringify(this.props.selected));
  }


  render() {
    const { classes, totalPayableAmount, selectedCurrencyInvoices } = this.props;
    const { name, number, expiry, cvc, focused, isFormValid, 
      adhocPayment, paymentType, chequeABANubmer, 
      chequeBankAccountNumber, enableAdhocPayment } = this.state;
    return (
      <Paper className={classes.root}>
        <Grid container spacing={24}>
          <Grid item container sm={12}>
            <Grid item container className={classes.totalPaymentContainer} xs={12} sm={6}>
              <Grid item className={classes.totalPaymentTypo}>
                <Typography variant='subheading' gutterBottom className={classes.displayFlex}>
                  <CheckBoxIcon color={enableAdhocPayment ? 'disabled' : 'secondary'} className={classes.checkboxIcon}/> 
                  <span>Total payable amount:</span>
                </Typography>
                <FormControlLabel className={classes.adhocPaymentSwitch} control={<Switch value="enableAdhocPayment" onChange={this.handleSwitchChange('enableAdhocPayment')} />} label="Adhoc Payment:" />
                { paymentType === 'credit' && <Typography variant='subheading' gutterBottom>
                  Service charges:
                </Typography>}
                { paymentType === 'credit' && <Typography variant='subheading' gutterBottom>
                  Net payment:
                </Typography>}
              </Grid>
              <Grid item xs={2} className={classes.totalPaymentNumbers}>
                <Typography variant='subheading' gutterBottom>
                  <Currency
                    quantity={totalPayableAmount}
                  />
                  <span className={classes.currencyTypo}>&nbsp;{selectedCurrencyInvoices === 0 ? 'USD' : 'CAD'}</span>
                </Typography>
                <TextField fullWidth className={classes.adhocPayment}
                  disabled={!enableAdhocPayment}
                  id="adhocPayment"
                  value={adhocPayment} 
                  onChange={this.handleTextFieldChange('adhocPayment')}
                  inputProps={{disablePadding: true}}
                  InputProps={{
                    inputComponent: CurrencyInputFormat,
                  }}
                />
                <span className={classes.currencyTypo}>&nbsp;{selectedCurrencyInvoices === 0 ? 'USD' : 'CAD'}</span>
                { paymentType === 'credit' && <Typography variant='subheading' gutterBottom>
                  <Currency
                    quantity={((enableAdhocPayment ? +adhocPayment: totalPayableAmount) * 2.5) / 100}
                  />
                  <span className={classes.currencyTypo}>&nbsp;{selectedCurrencyInvoices === 0 ? 'USD' : 'CAD'}</span>
                </Typography>}
                { paymentType === 'credit' && <Typography variant='subheading' gutterBottom>
                  <Currency
                    quantity={(enableAdhocPayment ? +adhocPayment: totalPayableAmount) + (((enableAdhocPayment ? +adhocPayment : totalPayableAmount) * 2.5) / 100)}
                  />
                  <span className={classes.currencyTypo}>&nbsp;{selectedCurrencyInvoices === 0 ? 'USD' : 'CAD'}</span>
                </Typography>}
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel control={<Switch value="enableAdhocPayment" onChange={this.handleSwitchChange('enableAdhocPayment')} />} label="Adhoc Payment" />
              </Grid> */}
              {/* {enableAdhocPayment && <Grid item xs={12}>
                <TextField fullWidth className={classes.adhocPayment}
                  label="Adhoc Payment"
                  id="adhocPayment"
                  value={adhocPayment} 
                  onChange={this.handleTextFieldChange('adhocPayment')}
                  InputProps={{
                    inputComponent: CurrencyInputFormat,
                  }}
                />
              </Grid> } */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" required className={classes.formControl}>
                <FormLabel component="legend">Payment type</FormLabel>
                <RadioGroup
                  aria-label="payment type"
                  name="paymentType"
                  className={classes.group}
                  value={this.state.paymentType}
                  onChange={this.handlePaymentTypeChange}
                >
                  <FormControlLabel value="debit" control={<Radio />} label="Debit" />
                  <FormControlLabel value="credit" control={<Radio />} label="Credit" />
                  <FormControlLabel value="ach" control={<Radio />} label="ACH" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        {paymentType !== 'none' && <Grid container spacing={24} direction={isWidthDown('sm', this.props.width) ? 'column-reverse': 'row'}>
          <Grid item xs={12} sm={6}>
            <form noValidate autoComplete="off" className={classes.form}>
            { paymentType !== 'ach' && <Grid container spacing={24}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="number">Card Number</InputLabel>
                    <Input
                      id="number"
                      name="number"
                      onKeyUp={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                      onBlur={event => this.handleInputFocus({target: {name: ''}})}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input
                      id="name"
                      name="name"
                      onKeyUp={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                      onBlur={event => this.handleInputFocus({target: {name: ''}})}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="expiry">Valid Thru</InputLabel>
                    <Input
                      id="expiry"
                      name="expiry"
                      onKeyUp={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                      onBlur={event => this.handleInputFocus({target: {name: ''}})}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="cvc">CVC</InputLabel>
                    <Input
                      id="cvc"
                      name="cvc"
                      onKeyUp={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                      onBlur={event => this.handleInputFocus({target: {name: ''}})}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            }
            { paymentType === 'ach' && 
              <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="chequeABANubmer">ABA No</InputLabel>
                    <Input
                      id="chequeABANubmer"
                      name="chequeABANubmer"
                      onKeyUp={this.handleInputChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="chequeBankAccountNumber">Bank Account Number</InputLabel>
                    <Input
                      id="chequeBankAccountNumber"
                      name="chequeBankAccountNumber"
                      onKeyUp={this.handleInputChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            }
            </form>
          </Grid>
          { paymentType !== 'ach' && <Grid item xs={12} sm={6}>
            <Cards
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={this.handleCallback}
            />
          </Grid> }
          { paymentType === 'ach' && <Grid item xs={12} sm={6}>
            <Paper className={classes.chequeContainer} elevation={1}>
              <Typography variant="body1" component="h3">
                Pay to the order of
              </Typography>
              <Typography variant="body2" component="h3" className={classes.chequeToName}>
                Gabriel &amp; Co
              </Typography>
              <Grid container spacing={24}>
                <Grid item sm={3}>
                  <Paper className={classes.chequeNumber}>{chequeABANubmer}</Paper>
                  <Typography variant="body1" component="h3">
                    ABA No.
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <Paper className={classes.chequeNumber}>{chequeBankAccountNumber}</Paper>
                  <Typography variant="body1" component="h3">
                    Bank Account No.
                  </Typography>
                </Grid>
                <Grid item sm={3}>
                  <Paper className={classes.chequeNumber}>
                    {enableAdhocPayment ? <Currency
                      quantity={paymentType === 'credit' ? (+adhocPayment) + (((+adhocPayment) * 2.5) / 100) : (+adhocPayment)} 
                    /> :
                    <Currency
                      quantity={paymentType === 'credit' ? totalPayableAmount + ((totalPayableAmount * 2.5) / 100) : totalPayableAmount} 
                    />}
                    &nbsp;{selectedCurrencyInvoices === 0 ? 'USD' : 'CAD'}
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid> }
        </Grid> }
        <Grid container spacing={24} justify="flex-end">
          <Button variant="contained" color="primary" className={classes.button} disabled={!isFormValid} onClick={this.storeSelectedData}>
            <Link to='/success' className={classes.buttonLink}>Proceed to Pay</Link>
          </Button>
        </Grid>
      </Paper>
    )
  }
}

PaymentInformation.propTypes = {
  classes: PropTypes.object.isRequired,
  totalPayableAmount: PropTypes.number.isRequired,
  selectedCurrencyInvoices: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired
};

export default withWidth()(withStyles(styles)(PaymentInformation));