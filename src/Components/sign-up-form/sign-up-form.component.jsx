import { useState } from "react";
import {creatAuthUserWithEmailAndPassword, auth, createUserDocumentFromUserAuth} from "../../utils/firebase/firebase"
import  FormInput from  "../form-input/forminput.component"
import "./sign-up-form.styles.scss"
import {Button_Type_classes,Button} from "../button/button.component.jsx";
const defaultFormFields = {
    displayName : "",
    email : "",
    password : "",
    confirmPassword : ""
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)

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
        try{
            const {user} = await creatAuthUserWithEmailAndPassword(auth, email, password)
            createUserDocumentFromUserAuth(user, {displayName : event.target[0].value})
        }
        catch(error){
            console.log("error while creating user", error)
        }

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