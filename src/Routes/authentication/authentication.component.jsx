
import "./authentication.styles.scss"
import SignUpForm from "../../Components/sign-up-form/sign-up-form.component"
import SignInForm from "../../Components/sign-in-form/sign-in-form.component"

function Authentication (){


    return(
        <div className="authentication-container">
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}
 

export default Authentication;