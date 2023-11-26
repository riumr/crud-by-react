import { useEffect,useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../Styles/common.css"
import configuration from "../firebaseConfig";
import Delete from "./delete";

const app = initializeApp(configuration);
const db = getFirestore(app);
const currentUrl = window.location.href
const params = currentUrl.split("/")[currentUrl.split('/').length-1]

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
    console.log(params)
    return(
        <div className="container-div">
            <div className="top-div">
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
                <Link to="/">목록</Link>
                <Link to={`/update/${params}`}>수정</Link>
            </div>
        </div>
    )
}

export default Detail;