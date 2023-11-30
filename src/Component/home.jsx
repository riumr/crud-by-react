import { useEffect,useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection,getDocs } from "firebase/firestore"; 
import { Link } from "react-router-dom";
import "../Styles/home.css"
import "../Styles/common.css"
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
        <div className="container-div">
            <header className="my-3">
                <h1 className="text-3xl">Home</h1>
                <input type="search" className="search-box rounded-[5rem] ms-3 w-[25rem] h-10 p-3"/>
            </header>
            <div className="home-banner h-96 bg-zinc-400">
                {/* carousel */}
            </div>
            <main>
                <div className="home-category-login h-36 grid grid-cols-6 gap-3 my-2">
                    <div className="home-category col-span-4 bg-zinc-300">
                        {/* category */}
                    </div>
                    <div className="home-login col-span-2 bg-zinc-300">
                        {/* login */}
                    </div>
                </div>
                <div className="home-recommend h-44 flex gap-2 my-2">
                    {/* recommend item */}
                    <div className="flex-auto bg-zinc-300"></div>
                    <div className="flex-auto bg-zinc-300"></div>
                </div>
                <div className="item h-36 grid grid-cols-4 gap-2">
                    {/* item */}
                    {data.map((item,index)=>(
                        <div key={index} className="bg-zinc-200">
                            <div>{item.timestamp}</div>
                            <div><Link to={`/detail/${item.timestamp}`}>{item.title}</Link></div>
                        </div>
                    ))}
                </div>
                <Link to="/create">추가하기</Link>
            </main>
        </div>
    )
}


export default Home