import { useRef } from "react";

export default function Start({ setUsername }){
    const inputRef=useRef();
    const handleClick =()=>{
        inputRef.current.value && setUsername(inputRef.current.value);
    }


    return(
        
        <>
        {/* <div className="begin">
        <h3 >QuizGenius : Explore , Play & Learn &#128515;</h3>
        </div> */}
        
        <div className="start">
        <h3  style={{ color: '#FFBF00' }}>QuizGenius : Explore , Play & Learn </h3>
            <input placeholder="Enter your name" className="startInput"ref={inputRef} />
            <button className="startButton" onClick={handleClick}>Play &#128512;</button>

        </div>
        </>
    )
}