import { useState } from "react";
import { useDispatch } from "react-redux";
import { StartSignInWithEmailAndPassword, StartSignInwithGoogle } from "../../store/user/user.Slice";
import { SignInAuthUserWithEmailAndPassword, GooglesignInWithPopUp} from "../../utils/firebase/firebase"
import  FormInput from  "../form-input/forminput.component"
import "./sign-in-form.styles.scss"
import {Button_Type_classes, Button} from "../button/button.component.jsx";

const defaultFormFields = {
    email : "",
    password : "",
}

const SignInForm = () => {
    const dispatch = useDispatch()

    const [formFields, setFormFields] = useState(defaultFormFields)

    const {email, password} = formFields


    const handelChange  = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name] : value}) 
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        dispatch(StartSignInWithEmailAndPassword({email , password}))

    //    event.preventDefault();

    //     try{
    //         const {user} = await SignInAuthUserWithEmailAndPassword(email, password)
    //         console.log(user)
    //     }
    //     catch(error){
    //         console.log(error)
    //         switch(error.code){
    //             case "auth/user-not-found":
    //                 alert("The email you entered is not associated with a user")
    //                 break;
    //             case "auth/wrong-password":
    //                 alert("Wrong password")
    //                 break;
    //             default:
    //                 console.log("error while signning in the user", error.code)
             
    //         }
    //     }

    //     setFormFields({ email: "", password: ""})
        

        //create a user document
    }
    const handleGoogleSignInclick = () => {
        dispatch(StartSignInwithGoogle())
    }
    return(
    <div className="sign-in-form">
        <h2>Already have an account?</h2>
        <span>Sign in with email and password</span>
        <form onSubmit={handelSubmit}>
            <FormInput label="email"  type="email" name="email" value={formFields.email} onChange={handelChange}/>

            <FormInput label="password"  type="password" name="password" value={formFields.password} onChange={handelChange} />

            <div className="button-containers">
                <Button buttonType={Button_Type_classes.base} type="submit" onSubmit={handelSubmit}> Sign In</Button>
                <Button buttonType ={Button_Type_classes.google} type="button" handelClick={handleGoogleSignInclick}> Sign In With google</Button>
            </div>
        </form>
       
    </div>
    )
}

export default SignInForm;