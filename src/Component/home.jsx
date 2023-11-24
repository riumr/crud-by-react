import { useEffect,useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection,getDocs } from "firebase/firestore"; 
import { Link } from "react-router-dom";
import "../Styles/home.css"
import 'tailwindcss/tailwind.css';
import configuration from "../firebaseConfig";

const app = initializeApp(configuration);
const db = getFirestore(app);

const Home = () =>{
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
    console.log(data)
    return (
        <div>
            <div className="home-div">
                <h1 className="text-3xl underline">Home</h1>
                <table className="home-table mt-2">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                    </tr>
                    </thead>  
                    <tbody>
                        {data.map((td,index)=>(
                            <tr key={index}>
                                <td>{td.timestamp}</td>
                                <td>
                                    <Link to={`/detail/${td.timestamp}`}>{td.title}</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>     
                </table>
                <Link to="/create">작성하기</Link>
            </div>
        </div>
    )
}


export default Home