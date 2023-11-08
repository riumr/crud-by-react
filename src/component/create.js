import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import { useForm } from "react-hook-form";
import configuration from "../firebaseConfig";

const app = initializeApp(configuration);
const db = getFirestore(app);

function CreateForm(){
    // eslint-disable-next-line
    const {register,handleSubmit,formState:{ errors }} = useForm();
    return (
        <form onSubmit={handleSubmit(sendToDoc)}>
            <input {...register('title')} />
            <textarea rows={10} {...register('content', { required: true })} />
            {errors.content && <p>Last name is required.</p>}
            <input type="submit" />
        </form>
    );
}

const sendToDoc = (data) =>{
    const titleInput = data.title;
    const contentInput = data.content;
    try {
        const docRef = async()=> {
            await addDoc(collection(db, "indexTable"), {
                title: titleInput,
                content: contentInput,
            });
        }
        docRef()      
        console.log("Document written");
    } catch (e) {
    console.error("Error adding document: ", e);
    }
}
export default CreateForm;