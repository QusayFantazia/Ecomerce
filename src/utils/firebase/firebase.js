// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import {getFirestore, doc, setDoc, getDoc, collection, writeBatch, query, getDocs} from "firebase/firestore"
import { cloneElement } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCb3lV1dAM29DzHYlXUl8qFJpcGx2HTjQ",
    authDomain: "crwn-clothing-b0c02.firebaseapp.com",
    projectId: "crwn-clothing-b0c02",
    storageBucket: "crwn-clothing-b0c02.appspot.com",
    messagingSenderId: "460300847305",
    appId: "1:460300847305:web:fe0973707ee7699cf3e518"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const GoogleProvide = new GoogleAuthProvider();
GoogleProvide.setCustomParameters({
    prompt:"select_account"
})
export const auth = getAuth();


//Google Sign in methods
export const  GooglesignInWithPopUp = async() => await signInWithPopup(auth, GoogleProvide)
export const  GoogleSignInWithRedirect = () => signInWithRedirect(auth, GoogleProvide)



//Firestore functions
const db = getFirestore(app)
export const createUserDocumentFromUserAuth = async (userAuth, additionalInformation) => { 
  const userRef = await doc(db, "users", userAuth.uid)

  const documentSnapShot =   await getDoc(userRef)


  if(!documentSnapShot.exists()){
    try{
      await setDoc(userRef, {
        createdAt : new Date(),
        displayName : userAuth.displayName,
        email : userAuth.email,
        ...additionalInformation
      })
      return userRef
    }
    catch(error){
      console.log("This is the error"+error.message)
    }
  }

}

//Sign up with email and password
export const creatAuthUserWithEmailAndPassword = async (auth, email, password) => {
  if(!email || ! password)
    return
  const authUserRef = await createUserWithEmailAndPassword(auth, email, password)
  return authUserRef
}

//sign in with email and password

export const SignInAuthUserWithEmailAndPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
}
export const UserSignOut= async() => await signOut(auth)

export const onUserAuthStateChanged = (callback) =>  onAuthStateChanged(auth, callback)


export const AddCategoriesAndProducts = async (collectionName, objectsToAdd) => {
  const collectionRef = collection(db, collectionName)
  const batch = writeBatch(db)
  objectsToAdd.forEach(element => {

    const docRef = doc(collectionRef, element.title.toLowerCase())
    batch.set(docRef, element)
  });

  await batch.commit()
  console.log("done")

}


export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();

    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;

};