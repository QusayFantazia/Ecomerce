import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Button, Button_Type_classes } from "../button/button.component";
import { PaymentFormContainer, FormContainer } from "./payment-form.styles";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { userSelector } from "../../store/user/user.selector";
const PaymentForm = () => {
    const stripe = useStripe();
    const elments = useElements()

    const [ isLoading, setIsLoading ] = useState(false)

    const cartTotal = useSelector(selectCartTotal)
    const user = useSelector(userSelector)


    const paymentHandeler = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        if(!stripe || !elments) return
        
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount : cartTotal * 100})
        }).then(res => res.json());

        const {paymentIntent : {client_secret}} = response

        console.log(client_secret)

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method : {
                card : elments.getElement(CardElement),
                billing_details : {
                    name : user
                }
            }
        })
        
        setIsLoading(false)

        if(paymentResult.error){
            alert(paymentResult.error);
        }
        else{
            if(paymentResult.paymentIntent.status == "succeeded"){
                alert('Payment successfull')
            }
        }
    };

    return(
        <PaymentFormContainer onSubmit={paymentHandeler}>
            <FormContainer>
                <h2> Credit Card Payment : </h2>
                <CardElement/>
                <Button buttonType={Button_Type_classes.inverted} isLoading={isLoading}> Pay Now</Button>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm