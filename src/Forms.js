import React, { Component } from 'react'
import Input from './components/Input'

export class Forms extends Component {

    state = {
        orderForm: {
            name: {
                elementtype: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'enter name'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            street: {
                elementtype: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'enter street'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            Pincode: {
                elementtype: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'enter Pincode'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                }
            },
            Country: {
                elementtype: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'enter Country'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            Email: {
                elementtype: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'enter Country'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            delvieryMethod: {
                elementtype: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Quicker' },
                    { value: 'Cheapest', displayValue: 'Slower' },]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                touched: false,
            },
        },
        formValid: false
    }
    OrderHandler = (event) => {
        event.preventDefault();
        const finalFormData = {};
        for (const key in this.state.orderForm) {
            if (Object.hasOwnProperty.call(this.state.orderForm, key)) {
                finalFormData[key] = this.state.orderForm[key].value;
            }
        }
        console.log('finalFormData', finalFormData)
    }

    checkValidity(value, rules) {
        let isValid = true;
        isValid = (rules.required ? value.trim() !== '' : true) && isValid;
        isValid = rules.minLength ? (value.length <= rules.minLength) && isValid : isValid;
        isValid = rules.maxLength ? (value.length >= rules.maxLength) && isValid : isValid;
        return isValid
    }
    inputEventHandler = (event, InputIdentifier) => {

        // Nice thrill work
        const updatedOrderForm = { ...this.state.orderForm }
        const updatedFormEachElement = { ...updatedOrderForm[InputIdentifier] }
        updatedFormEachElement.value = event.target.value;
        updatedFormEachElement.valid = this.checkValidity(updatedFormEachElement.value, updatedFormEachElement.validation);
        updatedFormEachElement.touched = true;
        let formValidation = true;
        for (const key in updatedOrderForm) {
            if (Object.hasOwnProperty.call(updatedOrderForm, key)) {
                console.log(' updatedFormEachElement[key].valid', updatedOrderForm[key].valid)
                formValidation = updatedOrderForm[key].valid && formValidation;
            }
        }
        console.log('formValidation', formValidation)
        updatedOrderForm[InputIdentifier] = updatedFormEachElement
        console.log('updatedFormEachElement', updatedFormEachElement)
        this.setState({ orderForm: updatedOrderForm, formValid: formValidation })

    }
    render() {

        const formElementArray = [];
        for (const key in this.state.orderForm) {
            if (Object.hasOwnProperty.call(this.state.orderForm, key)) {
                formElementArray.push(
                    {
                        id: key,
                        config: this.state.orderForm[key]
                    }
                );
            }
        }
        return (
            <div>
                <form onSubmit={this.OrderHandler}>
                    {formElementArray.map(formElement =>
                        <Input
                            key={formElement.id}
                            elementtype={formElement.config.elementtype}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            onchange={(event) => this.inputEventHandler(event, formElement.id)}
                        />
                    )}
                    <button type='submit' disabled={!this.state.formValid}> Place</button>
                </form>


            </div>
        )
    }
}

export default Forms
