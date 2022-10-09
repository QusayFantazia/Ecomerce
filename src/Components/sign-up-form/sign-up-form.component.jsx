import { useState } from "react";
import { useDispatch } from "react-redux";

import {creatAuthUserWithEmailAndPassword, auth, createUserDocumentFromAuth} from "../../utils/firebase/firebase"
import  FormInput from  "../form-input/forminput.component"
import { startSignUp } from "../../store/user/user.Slice";
import "./sign-up-form.styles.scss"
import {Button_Type_classes, Button} from "../button/button.component.jsx";
const defaultFormFields = { 
    displayName : "",
    email : "",
    password : "",
    confirmPassword : ""
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)

    const dispatch = useDispatch()

    const {displayName, email, password, confirmPassword} = formFields

    const handelChange  = ( event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name] : value}) 
    }

    const handelSubmit = async (event) => {
       event.preventDefault();
        //confirm passwords match
        if(password ===! confirmPassword)
            return

        dispatch(startSignUp({displayName : displayName, email : email, password : password, confirmPassword : confirmPassword}))
        // try{
        //     const {user} = await creatAuthUserWithEmailAndPassword(auth, email, password)
        //     createUserDocumentFromAuth(user, {displayName : event.target[0].value})
        // }
        // catch(error){
        //     console.log("error while creating user", error)
        // }

        setFormFields({displayName: "", email: "", password: "", confirmPassword: ""})
        

        //create a user document
    }
    return(
    <div className="sign-up-form">
        <h2>Don't have an account?</h2>
        <span>sign up with you email and password</span>
        <form onSubmit={handelSubmit}>

            <FormInput label="Display Name" type="text" name="displayName" value={formFields.displayName} onChange={handelChange}/>

            <FormInput label="email"  type="email" name="email" value={formFields.email} onChange={handelChange}/>

            <FormInput label="password"  type="password" name="password" value={formFields.password} onChange={handelChange} />

            <FormInput label="confirm password" type="password" name="confirmPassword" value={formFields.confirmPassword} onChange={handelChange}/>

            <Button typeButton={Button_Type_classes.inverted} onSubmit={handelSubmit}>Sign up</Button>

        </form>
    </div>
    )
}

export default SignUpForm;