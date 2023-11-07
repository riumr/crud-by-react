import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import { useForm } from "react-hook-form";
import configuration from "../firebaseConfig";

const app = initializeApp(configuration);
const db = getFirestore(app);

// 1
function Create(){
    return (
        <form onSubmit={create}>
            <label>Title</label>
                <input type="text" name="title" />
            <label>Content</label>
                <textarea rows="10" name="content" />
            <button type="submit">post</button>
        </form>
    )
}

function create(event){
    event.preventDefault(); 
    const formData = new FormData(event.target);
    const titleInput = formData.get("title")
    const contentInput = formData.get("content")
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

// 2
function FormTest(){
    // eslint-disable-next-line
    const {register,handleSubmit,formState:{ errors }} = useForm();
    return (
        <form onSubmit={handleSubmit(sendToDoc)}>
            <input {...register('title')} />
            <input {...register('content', { required: true })} />
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
export {FormTest,Create};