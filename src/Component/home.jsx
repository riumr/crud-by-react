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
            <header className="my-3 w-full">
                <h1 className="text-3xl">Home</h1>
                <input type="search" id="search-box" className="w-[25rem] h-10 rounded-[5rem] ms-3 p-3"/>
            </header>
            <div id="home-banner" className="w-[100%] h-[40rem] bg-zinc-400">
                {/* carousel */}
            </div>
            <main>
                <div id="home-recommend" className="w-[50%] h-[30rem] flex flex-col justify-center border border-black">
                    {/* recommend item */}
                    {/* carousel */}
                    <img src="" alt="recommend-item-img" className="w-full h-[23rem] bg-zinc-300"/>
                    <div className="mt-3 self-center">
                        <button className="w-[15rem] h-[3rem] border border-black"></button>
                        <button className="w-[15rem] h-[3rem] border border-black"></button>
                    </div>
                </div>
                <div id="home-login" className="w-[50%] h-[15rem] flex justify-center items-end border border-black">
                    {/* login */}
                    <div className="flex flex-col gap-y-1 mb-4">
                        <input className="w-[15rem] h-[3rem] p-3 border border-black"/>
                        <input className="w-[15rem] h-[3rem] p-3 border border-black"/>
                        <div className="w-[15rem] h-[3rem] border border-black text-center">
                            {/* firebase auth 사용 */}
                            회원가입 | 로그인
                        </div>
                    </div>
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