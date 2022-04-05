import {
    signInWithGooglePopup ,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils"
import SignUpForm from "../../components/sign-up-form/sign-up-form.component"
import SignInForm from "../../components/sign-in-form/sign-in-form.component"
import FormInput from "../../components/form-input/form-input.component"
import Button from "../../components/button/button.component"
import {useState} from "react"
import './authentication.styles.scss'

const Authentication = () => {

    
    return (
        <div className="authentication-container">
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}

export default Authentication