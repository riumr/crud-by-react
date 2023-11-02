import supabase from "./config/supabaseClient";

// 데이터 가져오기
const SupabaseTable= async()=> {  
    let { data: indexTable } = await supabase
    .from('indexTable')
    .select('*')

    if (indexTable){
        console.log(indexTable.map((x)=>x))
    }
}
// 데이터 가져오기 함수 호출
export default SupabaseTable;
