export default function SearchInput({getId, setId, id}){
    
    return(
        <div className="px-2 space-x-3 mt-5 flex justify-center items-center">
            <input value={id} onChange={(e)=> setId(e.target.value)} className="px-2 py-3 border-2 rounded-md" type="number" placeholder="Input ID..." />
            <button onClick={getId} className="px-6 py-3 hover:text-black hover:bg-slate-300 bg-black text-white font-bold rounded-md">Search</button>
        </div>
    )
}