import { useEffect,useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import configuration from "../firebaseConfig";

const app = initializeApp(configuration);
const db = getFirestore(app);

function Detail() {
    const [data,setData] = useState([]);
    useEffect(()=>{
        const fetchDoc = async() =>{
            const q = query(collection(db, "indexTable"),where("title","==","atitle"));
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
                    </div>
                ))}
        </div>
    )
}


export default Detail;