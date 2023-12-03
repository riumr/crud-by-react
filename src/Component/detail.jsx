import { useEffect,useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../Styles/common.css"
import "../Styles/detail.css"
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

    // item photo
    const itemPhoto = ({img_path}) => {
        <div className="w-[5rem] h-[5rem] bg-zinc-300">
            <img src={img_path} alt="item_img" />
        </div>
    }

    return(
        <div className="wrap">
            <header className="my-3">
                <h1 className="text-3xl">Home</h1>
                <input type="search" className="search-box rounded-[5rem] ms-3 w-[25rem] h-10 p-3"/>
            </header>
            <main>
                <div className="item-photo-buy w-[80rem] h-[36rem] flex bg-zinc-300">
                    <div className="item-photo bg-zinc-100 flex-col gap-2">
                        {/* item photo */}
                        <div className="item-main-photo w-[27rem] h-[27rem] bg-zinc-200">
                            {/* main photo */}
                        </div>
                        <div className="item-sub-photo flex gap-2 mt-3">
                            <div className="w-[5rem] h-[5rem] bg-zinc-300"></div>
                            <div className="w-[5rem] h-[5rem] bg-zinc-300"></div>
                            <div className="w-[5rem] h-[5rem] bg-zinc-300"></div>
                            <div className="w-[5rem] h-[5rem] bg-zinc-300"></div>
                            <div className="w-[5rem] h-[5rem] bg-zinc-300"></div>
                        </div>
                    </div>
                    <div className="w-[27rem] h-[36rem]"></div>
                    <div className="item-summary w-[27rem] h-[36rem] bg-zinc-200">
                        {/* item summary */}
                        <div className="item-price">
                            {/* price */}
                        </div>
                        <div className="item-name">
                            {/* item name */}
                        </div>
                        <div className="item-delivery">
                            {/* delivery method */}
                        </div>
                        <div className="item-amount">
                            {/* amount of item */}
                            <div>
                                <button className="">-</button>
                                <input type="text" />
                                <button className="">+</button>
                            </div>
                        </div>
                        <div className="item-buy-save">
                            <button className="">
                                {/* buy button */}
                                buy
                            </button>
                            <button className="">
                                {/* bucket save button */}
                                save
                            </button>
                        </div>
                    </div>
                </div>
                <div className="item-description-review">
                    <div className="item-description">
                        {/* item description image */}
                        {/* <img src="" alt="item_image" /> */}
                    </div>
                    <div className="item-rating">
                        {/* ratings */}
                        <div></div>
                        <div></div>
                    </div>
                    <div className="item-review">
                        {/* reviews */}
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </main>
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
            <footer></footer>
        </div>
    )
}

export default Detail;