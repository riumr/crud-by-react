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
                <input type="search" id="search-box" className="w-[25rem] h-10 rounded-[5rem] ms-3 p-3"/>
            </header>
            <div id="home-banner" className="w-full h-[40rem] bg-zinc-400">
                {/* carousel */}
            </div>
            <main>
                <div id="home-recommend" className="w-[50rem] h-[40rem] border border-black">
                    {/* recommend item */}
                    {/* carousel */}
                    <div className="w-full h-[30rem] flex flex-col border border-black">
                        <img src="" alt="recommend-item-img" className="w-full h-[23rem] bg-zinc-300"/>
                        <div className="self-center">
                            <button className="w-[15rem] h-[3rem] border border-black"></button>
                            <button className="w-[15rem] h-[3rem] border border-black"></button>
                        </div>
                    </div>
                </div>
                <div id="home-login" className="bg-zinc-300">
                    {/* login */}
                </div>
                <div id="item" className="grid grid-cols-4">
                    {/* item */}
                    {data.map((item,index)=>(
                        <div key={index} className="w-[10rem] h-[10rem] bg-zinc-200">
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