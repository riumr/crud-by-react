import { useEffect,useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import styled from "styled-components";
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
    return(
        <DetailTemplate />
    )
}

const DetailTemplate = () => {
    return (
        <div id="wrap">
            <div id="container">
                <StyledHeader>
                    <HeaderText>
                        <Link to='/'>Home</Link>
                    </HeaderText>
                    <SearchBar />
                </StyledHeader>
                <main>
                    <div id="item-photo-buy" className="w-[80rem] h-[33rem] flex bg-zinc-300">
                    <Photo>
                        <MainPhoto>
                            <img src="" alt="main_img" />
                        </MainPhoto>
                        <SubPhotoGroup>
                            <SubPhoto />
                            <SubPhoto />
                            <SubPhoto />
                            <SubPhoto />
                            <SubPhoto />
                        </SubPhotoGroup>
                    </Photo>
                        <div id="item-summary" className="w-[27rem] h-[27rem] flex flex-col justify-between px-4">
                            <ItemPriceName />
                            <ItemAmount />
                        </div>
                        <div id="item-buy-info" className="w-[25rem] bg-zinc-200 px-4 flex flex-col justify-between">
                            <ItemDeliveryMessage />
                            <ItemBuySave />
                        </div>
                    </div>
                    {/* sticky 스타일 적용 중 요소 위치 문제 발생 */}
                    <div id="item-description-review" className="w-[53.5rem] h-full border border-black">
                        <ItemDescription />
                        <ItemRating />
                        <ItemReview />
                    </div>
                </main>
                <footer></footer>
            </div>
        </div>
    )
}

const StyledHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin : 1rem 0 1rem 0;
`
const HeaderText = styled.h1`
    font-size: 30px;
    line-height: 36px;
`
const SearchBar = styled.input.attrs({type:'search'})`
    width : 25rem;
    height: 2.5rem;
    border-color:rgb(0,0,0);
    border-width: 1px;
    border-radius: 1rem;
    margin : 0 0 0 1rem;
    padding: 12px;
`

const Photo = styled.div`
    background-color: rgb(212 212 216);
`
const MainPhoto = styled.div`
    width:27rem;
    height:27rem;
    background-color: rgb(228 228 231);
`
const SubPhotoGroup = styled.div`
    display:flex;
    column-gap: 8px;
    margin-top: 12px;
`

const SubPhoto = ({imgPath}) => {
    return(
        <SubPhotoStyle src={imgPath} alt="item_img" className="w-[5rem] h-[5rem] bg-zinc-300"/>
    )
}

const SubPhotoStyle = styled.img`
    width:5rem;
    height:5rem;
    background-color: rgb(212 212 216);
`
const ItemPriceName = ({price,name}) => {
    return (
        <div id="item-price-name" className="flex flex-col gap-2">
            <div id="item-price" className="w-full h-[7rem] border border-black">
                <p>{price}</p>
            </div>
            <div id="item-name" className="w-full h-[5rem] border border-black">
                <p>{name}</p>
            </div>
        </div>
    )
}

const ItemAmount = () => {
    return (
        <div id="item-amount" className="w-full h-[7rem] flex justify-center items-center border border-black">
            {/* amount of item */}
            <div className="w-[9rem] h-[2rem] flex gap-2">
                <button id="">-</button>
                <input type="text" className="w-[7rem] h-[2rem] border border-black rounded-[5rem] p-4"/>
                <button id="">+</button>
            </div>
        </div>
    )
}

const ItemDeliveryMessage = () => {
    return (
        <div id="item-delivery-message">
            <div id="item-delivery" className="h-[8rem] border border-black">
                {/* delivery method */}
            </div>
            <div id="item-message" className="h-[8rem] border border-black">
                {/* message */}
            </div>
        </div>
    )
}

const ItemBuySave = () => {
    return (
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
    )
}

const ItemDescription = () => {
    return (
        <div id="item-description">
            <button id="item-info-button" className="w-[17rem] h-9 border border-black">상품정보</button>
            <button id="review-button" className="w-[17rem] h-9 border border-black">리뷰</button>
            {/* item description image */}
            <img src="" alt="item_image" className="w-full h-[54rem] bg-zinc-300"/>
        </div>
    )
}

const ItemRating = () => {
    return (
        <div id="item-rating" className="flex justify-around p-9">
            {/* ratings */}
            <div id="item-average_rating" className="w-[15rem] h-[10rem] bg-zinc-300"></div>
            <div id="item-rating-set" className="w-[25rem] h-[10rem] bg-zinc-300"></div>
        </div>
    )
}

const ItemReview = () => {
    return (
        <div id="item-review">
            {/* reviews */}
            <div id="item-review-title" className="w-full h-[3rem] bg-zinc-300">리뷰제목</div>
            <div id="item-review-content" className="w-full h-[12rem] bg-zinc-200"></div>
        </div>
    )
}

const TopDiv = ({data}) => {
    return (
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
    )
}

export {Detail, DetailTemplate, ItemPriceName};