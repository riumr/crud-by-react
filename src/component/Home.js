import { useEffect,useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection,getDocs } from "firebase/firestore"; 
import configuration from "../firebaseConfig";

const app = initializeApp(configuration);
const db = getFirestore(app);

function Home(){
    const [data,setData] = useState([]);
    useEffect(()=>{
        const fetchData = async() => {
            const querySnapShot = await getDocs(collection(db,'indexTable'))
            const rows = [];
            querySnapShot.forEach((doc)=>{
                const rowData = doc.data();
                rows.push(rowData)
            })
        setData(rows)
        };
    fetchData()
    },[])
    return (
        <div>
            <h1>Home</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                </tr>
                </thead>  
                <tbody>
                    {data.map((td,index)=>(
                        <tr key={index}>
                            <td>{td.id}</td>
                            <td>{td.title}</td>
                        </tr>
                    ))}
                </tbody>     
            </table>
        </div>
    )
}


export default Home