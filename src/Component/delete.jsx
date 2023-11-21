import { initializeApp } from "firebase/app";
import { getFirestore,doc,deleteDoc } from "firebase/firestore";
import configuration from "../firebaseConfig";

const app = initializeApp(configuration);
const db = getFirestore(app);

const Delete = async() => {
    try {
        const currentUrl = window.location.href
        const params = currentUrl.split("/")[currentUrl.split('/').length-1]
        await deleteDoc(doc(db, "indexTable", params));
        console.log("deleted")
        window.location.href="/"
    } catch(error){
        console.log(error)
    }
}
    
export default Delete;