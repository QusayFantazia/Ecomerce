
import {all, call, takeLatest, put} from "redux-saga/effects"
import { getCurrentUser, SignInAuthUserWithEmailAndPassword, GooglesignInWithPopUp } from "../../utils/firebase/firebase"
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase"
import { userSignout, creatAuthUserWithEmailAndPassword, auth } from "../../utils/firebase/firebase"
import { checkUserSession, StartSignInWithEmailAndPassword, StartSignInwithGoogle, SignInSuccess, SignInFailed, signoutStart, signoutSuccess, signoutFailed, startSignUp, signupSuccess, signupFailed} from "./user.Slice"

export function* signUp({payload : {displayName, email, password, confirmPassword}}){
    if(password !== confirmPassword) return
    try{
        const {user} = yield call (creatAuthUserWithEmailAndPassword, auth, email, password)
        yield call(createUserDocumentAsync, user)
    }catch(error){
        yield put(signupFailed(error))
    }
}

export function* onSignUp() {
    yield takeLatest(startSignUp, signUp)
}

export function* signOut(){
    try{
        yield call(userSignout)
        yield put(signoutSuccess())
    }catch (error){
        yield put(signoutFailed())
    }

}

export function* onSignOut() {
    yield takeLatest(signoutStart, signOut)
}

export function* signInWithEmailAndPasswordAsync({payload : {email, password}}){
    try {
        const {user} = yield SignInAuthUserWithEmailAndPassword(email, password)
        yield call(createUserDocumentAsync, user)
    }
    catch(error) {
        yield put(SignInFailed(error))
    }
}

export function* onSignWithEmailAndPassword(){
   yield takeLatest(StartSignInWithEmailAndPassword, signInWithEmailAndPasswordAsync)
}

export function* signInwithGoogle(){
    const {user} = yield call (GooglesignInWithPopUp)
    yield call(createUserDocumentAsync, user)
}

export function* onSignInWithGoogle() {
    yield takeLatest(StartSignInwithGoogle, signInwithGoogle)
}

export function* createUserDocumentAsync(userAuth){
    try{
        const documentSnapShot = yield call (createUserDocumentFromAuth, userAuth)
        const userData = documentSnapShot.data()
        yield put(SignInSuccess({...userData, id : userAuth.uid}))
    }

    catch(error) {
        yield put(SignInFailed(error))
    }

}

export function* checkUserIsAuthenticatedAsync(){

    const userAuth  = yield call(getCurrentUser)
    if(!userAuth) return
    yield call(createUserDocumentAsync, userAuth)

}

export function* onCheckUserSession() {
    yield takeLatest(checkUserSession, checkUserIsAuthenticatedAsync)
}


export function* UserSaga() {
    yield all([call(onCheckUserSession), call(onSignInWithGoogle), call(onSignWithEmailAndPassword), call(onSignOut), call(onSignUp)])
}