import { useEffect,useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore,setDoc } from "firebase/firestore";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import configuration from "../firebaseConfig";

const app = initializeApp(configuration);
const db = getFirestore(app);

function Update() {
    const [data,setData] = useState([]);
        useEffect(()=>{
            const fetchDoc = async() =>{
                const currentUrl = window.location.href
                const params = currentUrl.split("/")[currentUrl.split('/').length-1]
                const q = query(collection(db, "indexTable"),where("title","==",params));
                const querySnapshot = await getDocs(q); 
                const docs = [];
                querySnapshot.forEach((doc) => {
                    const docsData = doc.data()
                    docs.push(docsData)
                });
                setData(docs)
            }
            fetchDoc()
        },[])
        console.log("update page")
        return(
            <div>
                {data.map((detailDoc,index)=>(
                        <div key={index}>
                            <form onSubmit={HandleUpdate}>
                                <div>
                                    <h3>Title</h3>
                                    <input defaultValue={detailDoc.title}></input>
                                </div>
                                <div>
                                    <h3>Content</h3>
                                    <input defaultValue={detailDoc.content}></input>
                                </div>
                                <button type="submit">update</button>
                            </form>
                       </div>
                    ))}
            </div>
        )
}

function HandleUpdate(event){
    event.preventDefault(); 
    const currentUrl = window.location.href
    const params = currentUrl.split("/")[currentUrl.split('/').length-1]
    const formData = new FormData(event.target);
    const titleInput = formData.get("title")
    const contentInput = formData.get("content")
    const q = query(collection(db, "indexTable"),where("title","==",params));
    const docId = q.id
    const ref = doc(db,'indexTable',docId);
    setDoc(ref,{
        title:titleInput,
        content:contentInput,
    })
    } 


export default Update;