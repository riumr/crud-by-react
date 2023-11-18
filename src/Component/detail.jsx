import { useEffect,useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import configuration from "../firebaseConfig";
import Delete from "./delete";

const app = initializeApp(configuration);
const db = getFirestore(app);

const Detail = () => {
    const [data,setData] = useState([]);
    useEffect(()=>{
        const fetchDoc = async() =>{
            const currentUrl = window.location.href
            const params = currentUrl.split("/")[currentUrl.split('/').length-1]
            console.log(params)
            const q = query(collection(db, "indexTable"),where("timestamp","==",params));
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
    return(
        <div>
            {data.map((detailDoc,index)=>(
                <div key={index}>
                    <div>
                        <h3>Title</h3>
                        <p>{detailDoc.title}</p>
                    </div>
                    <div>
                        <h3>Content</h3>
                        <p>{detailDoc.content}</p>
                    </div>
                    <button onClick={Delete}>삭제</button>
                </div>
            ))}
            <a href="/">목록</a>
        </div>
    )
}



export default Detail;