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
        <div id="wrap">
            <header className="my-3">
                <h1 className="text-3xl">Home</h1>
                <input type="search" id="search-box" className="rounded-[5rem] ms-3 w-[25rem] h-10 p-3"/>
            </header>
            <div id="home-banner" className="h-96 bg-zinc-400">
                {/* carousel */}
            </div>
            <main>
                <div id="home-category-login" className="h-[15rem] grid grid-cols-6 gap-3 my-2">
                    <div id="home-category" className="col-span-4 bg-zinc-300">
                        {/* category */}
                    </div>
                    <div id="home-login" className="col-span-2 bg-zinc-300">
                        {/* login */}
                    </div>
                </div>
                <div id="home-recommend" className="h-[30rem] flex gap-2 my-2">
                    {/* recommend item */}
                    <div className="flex-auto bg-zinc-300"></div>
                    <div className="flex-auto bg-zinc-300"></div>
                </div>
                <div id="item" className="h-36 grid grid-cols-4 gap-2">
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
            <footer></footer>
        </div>
    )
}


export default Home