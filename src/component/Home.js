import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import configuration from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore"; 
import { useEffect } from "react";
const app = initializeApp(configuration);
const db = getFirestore(app);

function Home(){    
    useEffect(()=>{
        const getData = async() => {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            });
        }
        getData();
    },)
    return (
        <div>
            <h1>Home</h1>
            <table>
                <thead>
                <tr>
                    <th>this is table</th>
                </tr>
                </thead>
                <tbody>
                {/* DB에서 값 가져올 때 tr, td 추가 */}
                </tbody>
            </table>
        </div>
    )
}

export default Home