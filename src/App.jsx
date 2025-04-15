import { useState, useRef} from "react";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";

function App(){
  const [subject, setSubject] = useState("");
  const [hour, setHours] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  let count = useRef(1);
  const subInput = useRef(20);

  function handleToSubmit(){
    let obj = {
      id: count.current++,
      subject: subject,
      hour: hour,
    };
    setSubjectList([...subjectList, obj]);
    setSubject("");
    setHours("");
    subInput.current.focus();
  }

  function handleToUpdate(idToUpdate, sign){
    setSubjectList(subjectList.map((obj) => {
      return obj.id === idToUpdate ? {...obj, hour: sign === "+" ? Number(obj.hour) + 1 : obj.hour > 0 ? Number(obj.hour) - 1 : 0}: obj;
    }));
  }

  return (
    <>
      <div className="flex flex-col items-center w-[100%] ">
          <div className="heading">
            <h1 className="text-3xl my-3">Geekster Education Planner</h1>
          </div>
        <div className="form-container flex flex-col sm:flex-row items-center m-10 mt-3 gap-5 p-4">
          <input type="text" placeholder="Subject" className="border-2 w-50 px-3 py-1 text-xl rounded-xl" value={subject} onChange={(e) => setSubject(e.target.value)} ref={subInput}/>
          <input type="number" placeholder="Hours" className="border-2 w-50 px-3 py-1 text-xl rounded-xl" value={hour} onChange={(e) => setHours(e.target.value)}/>
          <button type="button" className="border-2 w-50 px-3 py-1 text-xl rounded-xl cursor-pointer" onClick={handleToSubmit}>Add</button>
        </div>
        <div className="planner-container w-[100%] flex flex-col items-center p-3">
          {
            subjectList.map((obj) => {
              return (
                  <div className="list flex justify-between items-center rounded-2xl w-[100%] sm:w-[60%] py-3 px-2 sm:px-10 text-2xl my-2 bg-cyan-300" key={obj.id}>
                    <p>{obj.subject}</p>
                    <span>-</span>
                    <p>{`${obj.hour} hours`}</p>
                    <div className="flex gap-5">
                      <span className="bg-green-400 py-1 px-2 rounded-lg flex justify-center items-center cursor-pointer" onClick={() => handleToUpdate(obj.id, "+")}><IoMdAdd />
                      </span>
                      <span className="bg-red-400 py-1 px-2 rounded-lg flex justify-center items-center cursor-pointer" onClick={() => handleToUpdate(obj.id, "-")} >
                      <IoMdRemove />
                      </span>
                    </div>
                  </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default App;