import './App.css';
import { collection, doc, getDocs, addDoc, query, orderBy, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import {useEffect, useState} from 'react'

import { MdDeleteSweep } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxCircleFill } from "react-icons/ri";

function App() {
  // 데이터 저장할 state 배열로 받기 
    const [todos, setTodos] = useState([])
    const [newList, setNewList] = useState('')
    const [changed, setChanged] = useState(false)

  const todosCollectionRef = collection(db, 'todos')

    useEffect(() => {
      //getDocs = 여러문서를 가르키는 거임 
      const getList = async () => {
        const data = await getDocs(
        // console.log(data.docs[0].id)
        // data.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        // });
        query(todosCollectionRef, orderBy('d_date', 'desc'))
      )
        setTodos(
          //data.docs.map 요 안에 들어있는 만큼 반복할 것이다 
          data.docs.map(doc => (
            { ...doc.data(), id: doc.id } )
          )
        )
      }  
      getList();

      setChanged(false);
    }, [changed]) 

    // ADD DATE
    const date = new Date()
    const now_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getHours() + "시" + date.getMinutes() + "분" + date.getSeconds() + "초"

    const createList = async () => {
      await addDoc(todosCollectionRef,{
        content : newList,
        d_date: now_date,
        isDone: false,
        timeStamp: Date.now()
      }
    )
    setNewList('');
    setChanged(true);
  
  };

      const updateList = async (id, content) => {
      const msg = window.prompt('TDO',content)
      if(msg){
        const listDoc = doc(todosCollectionRef,id)

        const editField = {
          content: msg, 
          d_date: now_date,
          timeStamp: Date.now()
        }
          await updateDoc(listDoc, editField)
          setChanged(true);
      }


    };
    const deleteList = async(id) => {
      const isTrue = window.confirm('ㄹㅇ?')
      if(isTrue){
        const deleteList = doc(todosCollectionRef,id)
          await deleteDoc(deleteList);
          setChanged(true);
      }
    }
    const isDoneList = async (id, isDone) => {
    const listDoc = doc(todosCollectionRef, id);
    const editField = {
      isDone : !isDone
    }
    await updateDoc(listDoc,editField);
    setChanged(true);
    // await updateDoc(listDoc, { isDone: !isDone });
    // setChanged(true);
  };
  return(
    <div className='App'>
      <header><h2> 오늘 할 일 </h2></header>
      
        <hr />

        <div className='todoBox'>
          <input type="text"
          placeholder='to do'
          value={newList}
          onChange={ e => setNewList(e.target.value)}
          />
          <button onClick={createList}><IoIosAddCircleOutline /></button>
        </div>

        {/* <div className='sort'>
          <ul>
            <li>최신순</li>
            <li>오래된순</li>
          </ul>
        </div> */}

        <div className='itemBox'>
        {todos.map(value => (
          <div className={`itemBoxList ${value.isDone ? 'done' : 'notDone'}`}key={value.id}>
            <div className='checkBox'>
          <button onClick={()=>isDoneList(value.id, value.isDone)} >
          {value.isDone ? <RiCheckboxCircleFill /> : <RiCheckboxBlankCircleLine />}
    </button>
            </div>
            <div>
              <p>{value.content}</p>
              <span>{value.d_date}</span>
            </div>
            

            <div className="EditBox">
              <button onClick={()=>updateList(value.id, value.content)}><MdEdit /></button>
              <button  onClick={()=>deleteList(value.id)}><MdDeleteSweep /></button>
              
            
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
