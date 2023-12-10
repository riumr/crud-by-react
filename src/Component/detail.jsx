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
    const itemPhoto = ({props}) => {
        <div className="w-[5rem] h-[5rem] bg-zinc-300">
            <img src={props.imgPath} alt="item_img" />
        </div>
    }

    return(
        <div id="wrap">
            <header className="my-3">
                <h1 className="text-3xl">Home</h1>
                <input type="search" id="search-box" className="rounded-[5rem] ms-3 w-[25rem] h-10 p-3"/>
            </header>
            <main>
                <div id="item-photo-buy" className="w-[80rem] h-[33rem] flex bg-zinc-300">
                    <div id="item-photo" className="bg-zinc-100 flex-col">
                        {/* item photo */}
                        <div id="item-main-photo" className="w-[27rem] h-[27rem] bg-zinc-200">
                            {/* main photo */}
                        </div>
                        <div id="item-sub-photo" className="flex gap-2 mt-3">
                            <div className="w-[5rem] h-[5rem] bg-zinc-300"></div>
                            <div className="w-[5rem] h-[5rem] bg-zinc-300"></div>
                            <div className="w-[5rem] h-[5rem] bg-zinc-300"></div>
                            <div className="w-[5rem] h-[5rem] bg-zinc-300"></div>
                            <div className="w-[5rem] h-[5rem] bg-zinc-300"></div>
                        </div>
                    </div>
                    <div id="item-summary" className="w-[27rem] h-[27rem] flex flex-col justify-between px-4">
                        <div id="item-price-name" className="flex flex-col gap-2">
                            <div id="item-price" className="w-full h-[7rem] border border-black">
                                {/* price */}
                            </div>
                            <div id="item-name" className="w-full h-[5rem] border border-black">
                                {/* item name */}
                            </div>
                        </div>
                        <div id="item-amount" className="w-full h-[7rem] flex justify-center items-center border border-black">
                            {/* amount of item */}
                            <div className="w-[9rem] h-[2rem] flex gap-2">
                                <button id="">-</button>
                                <input type="text" className="w-[7rem] h-[2rem] border border-black rounded-[5rem] p-4"/>
                                <button id="">+</button>
                            </div>
                        </div>
                    </div>
                    <div id="item-buy-info" className="w-[27rem] bg-zinc-200 px-4 flex flex-col justify-between">
                        {/* item summary */}
                        <div id="item-delivery-message">
                            <div id="item-delivery" className="h-[8rem] border border-black">
                                {/* delivery method */}
                            </div>
                            <div id="item-message" className="h-[8rem] border border-black">
                                {/* message */}
                            </div>
                        </div>
                        <div id="item-buy-save">
                            <button id="buy-button" className="w-full h-[4rem] border border-black rounded-[1rem]">
                                {/* buy button */}
                                buy
                            </button>
                            <button id="save-button" className="w-full h-[4rem] border border-black rounded-[1rem]">
                                {/* bucket save button */}
                                save
                            </button>
                        </div>
                    </div>
                </div>
                <div id="item-description-review">
                    <div id="item-description">
                        {/* item description image */}
                        {/* <img src="" alt="item_image" /> */}
                    </div>
                    <div id="item-rating">
                        {/* ratings */}
                        <div></div>
                        <div></div>
                    </div>
                    <div id="item-review">
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