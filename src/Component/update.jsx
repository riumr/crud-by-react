import { useEffect,useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore,getDoc,doc,setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../Styles/common.css"
import configuration from "../firebaseConfig";

const app = initializeApp(configuration);
const db = getFirestore(app);
const currentUrl = window.location.href
const params = currentUrl.split("/")[currentUrl.split('/').length-1]

const Update = () => {
    // input 필드의 default value로 사용할 값을 가져온다.
    const [formData, setFormData] = useState({
      title: '',
      content: '',
    });
  
    useEffect(() => {
      const fetchData = async () => {
        const bringDoc = doc(db, "indexTable", params);
        const bringRef = await getDoc(bringDoc);
        setFormData(bringRef.data());
      };
      fetchData();
    }, []);
    
  // input 필드의 값을 변화시킬 때는 onchange 속성과 그 때 트리거 될 함수 설정이 필요하다.
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        // title : input value
        [name]: value, 
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const ref = doc(db, 'indexTable', params);
      await setDoc(ref, {
        title: formData.title,
        content: formData.content,
        timestamp:formData.timestamp
        }
      );
      console.log("submitted")
      window.location.href=`/detail/${params}`
    };
  
    return (
      <div className="wrap">
        <div className="top-div">
          <form onSubmit={handleSubmit}>
            <label>title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <br/>
            <label>content</label>
            <textarea
              type="text"
              id="content"
              name="content"
              rows="5"
              value={formData.content}
              onChange={handleChange}
            />
            <br/>
            <button type="submit">제출</button>
          </form>
          <Link to="/">목록</Link>
        </div>
      </div>
    );
  };

export default Update;