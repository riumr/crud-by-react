import { initializeApp } from "firebase/app";
import { getFirestore,doc,deleteDoc } from "firebase/firestore";
import configuration from "../firebaseConfig";

const app = initializeApp(configuration);
const db = getFirestore(app);
const currentUrl = window.location.href
const params = currentUrl.split("/")[currentUrl.split('/').length-1]

const Delete = async() => {
    await deleteDoc(doc(db, "indexTable", params));
    console.log("deleted")
}
    
export default Delete;