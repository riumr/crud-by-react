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
                    </div>
                    <div id="item-summary" className="w-[27rem] h-[27rem] flex flex-col justify-between px-4">
                        <ItemPriceName />
                        <AmoutSettingZone>
                            <Amount>
                                <AmountButton>-</AmountButton>
                                <AmountField/>
                                <AmountButton>+</AmountButton>
                            </Amount>
                        </AmoutSettingZone>
                    </div>
                    <BuySection>
                        <div id="item-delivery-message">
                            <Delivery>
                                <p></p>
                            </Delivery>
                            <SellerMessage>
                                <p></p>
                            </SellerMessage>
                        </div>
                        <div>
                            <ItemBuySave />
                        </div>
                    </BuySection>
                    {/* sticky 스타일 적용 중 요소 위치 문제 발생 */}
                    <div id="item-description-review" className="w-[53.5rem] h-full border border-black">
                    <div id="item-description">
                        <Info>상품정보</Info>
                        <Review>리뷰</Review>
                        {/* item description image */}
                        <img src="" alt="item_image" className="w-full h-[54rem] bg-zinc-300"/>
                    </div>
                    <Rating>
                        <AverageRating></AverageRating>
                        <RatingSet></RatingSet>
                    </Rating>
                    <div id="item-review">
                        {/* reviews */}
                        <div id="item-review-title" className="w-full h-[3rem] bg-zinc-300">리뷰제목</div>
                        <div id="item-review-content" className="w-full h-[12rem] bg-zinc-200"></div>
                    </div>
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
        <PriceAndName>
            <Price>
                <p>{price}</p>
            </Price>
            <Name>
                <p>{name}</p>
            </Name>
        </PriceAndName>
    )
}

const PriceAndName = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

`

const Price = styled.div`
    width:100%;
    height:7rem;
    border-color: rgb(0 0 0);
`

const Name = styled.div`
    width:100%;
    height:5rem;
    border-color : rgb(0 0 0);

`

const AmoutSettingZone = styled.div`
    width: 100%;
    height: 7rem;
    diplay: flex;
    justify-content: center;
    aligh-items: center;
    border-color: rgb(0 0 0);
`

const Amount = styled.div`
    widht:9rem;
    height:2rem;
    display: flex;
    gap: 8px
`

const AmountField = styled.input.attrs('text')`
    width:7rem;
    height:2rem;
    border-color: rgb(0 0 0);
    border-radius: 5rem;
    padding: 1rem;
`

const AmountButton = styled.button`
`

const BuySection = styled.div`
    width: 25rem;
    background-color: rgb(212 212 216);
    padding: 0 1rem 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: between;    
`

const Delivery = styled.div`
    height: 8rem;
    border-color: black;
`

const SellerMessage = Delivery

const ItemBuySave = () => {
    return (
        <div id="item-buy-save">
            <BuyButton>
                {/* buy button */}
                buy
            </BuyButton>
            <SaveButton>
                {/* bucket save button */}
                save
            </SaveButton>
        </div>
    )
}

const BuyButton = styled.button`
    width: 100%;
    height: 4rem;
    border-color: black;
    border-radius: 1rem;
`

const SaveButton = styled.button`
    width: 100%;
    height: 4rem;
    border-color: black;
    border-radius: 1rem;
`

const Info = styled.button`
    width: 17rem;
    height: 2.25rem;
    border-color: black;
`

const Review = styled.button`
    width: 17rem;
    height: 2.25rem;
    border-color: black;
`
const Rating = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 36px;
`

const AverageRating = styled.div`
    width: 15rem;
    height: 10rem;
    background-color: rgb(212 212 216);
`

const RatingSet = styled.div`
    width: 25rem;
    height: 10rem;
    background-color: rgb(212 212 216);
`

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