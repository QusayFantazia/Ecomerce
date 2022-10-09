// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import {getFirestore, doc, setDoc, getDoc, collection, writeBatch, query, getDocs} from "firebase/firestore"
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
export const  GooglesignInWithPopUp = async() => {
  const UserCredential =  await signInWithPopup(auth, GoogleProvide)
  return UserCredential
} 
export const  GoogleSignInWithRedirect = () => signInWithRedirect(auth, GoogleProvide)

//Firestore functions
const db = getFirestore(app)
export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => { 
  const userRef = await doc(db, "users", userAuth.uid)

  const documentSnapShot =   await getDoc(userRef)  

  const Userobject = {
    createdAt : new Date().toDateString(),
    displayName : userAuth.displayName,
    email : userAuth.email,
    ...additionalInformation
  }

  if(!documentSnapShot.exists()){
      try{
        await setDoc(userRef, Userobject)
      }
      catch(error){
        console.log(error)
      }
    }

  const userRefAfterCreation = await doc(db, "users", userAuth.uid)
  const userSnapShot = await getDoc(userRefAfterCreation)
  return userSnapShot
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
export const userSignout= async() => await signOut(auth)

export const onAuthStateChangedListener = (callback) =>  onAuthStateChanged(auth, callback)


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
// auth.signOut()


export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);


  const categoriesArray = querySnapshot.docs.map(doc => doc.data())



  return categoriesArray;

};

export const getCurrentUser = async () => {
  return new Promise((resolve, reject) => {

      const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
        unsubscribe()
        resolve(userAuth)

      }, reject)
      
  })
}