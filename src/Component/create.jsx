import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { setDoc,doc } from "firebase/firestore"; 
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import configuration from "../firebaseConfig";
import { DetailTemplate } from "./detail";

const app = initializeApp(configuration);
const db = getFirestore(app);
// 등록되는 시점의 시간을 사용한 timeId 생성
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();



const Create = () => {
    return (
        <DetailTemplate/>
    )
}


const CreateForm = () =>{
    // eslint-disable-next-line
    const {register,handleSubmit,formState:{ errors }} = useForm();
    return (
        <div>
            <form onSubmit={handleSubmit(sendToDoc)}>
                <input {...register('title')} />
                <textarea rows={10} {...register('content', { required: true })} />
                {errors.content && <p>Last name is required.</p>}
                <input type="submit" />
            </form>
            <Link to="/">목록</Link>
        </div>
    );
}

const sendToDoc = async(data) =>{
    const titleInput = data.title;
    const contentInput = data.content;
    const timeId = year + month + day + hours + minutes + seconds;
    const timeIdString = String(timeId)
    try {
        await setDoc(doc(db, "indexTable",timeIdString), {
            title: titleInput,
            content: contentInput,
            timestamp: timeIdString,
        });
        console.log("Document written");
        window.location.href="/"
    } catch (e) {
    console.error("Error adding document: ", e);
    }
}

export {CreateForm,Create};