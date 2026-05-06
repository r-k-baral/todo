import {useState} from 'react'

import '../style/addtask.css'



const AddTask = () => {
  const [taskData , settaskData] = useState({});
  const handleTask  = async (e)=>{
    e.preventDefault(); // 🚫 stop page reload
      const dataWithTime = {
    ...taskData,
    createdAt: new Date().toISOString() , // full timestamp
     priority: taskData.priority || "low", // default
     completed: false    //Every new task should start as not complete
  };

    console.log(taskData);
    let results = await fetch('http://localhost:3500/add-task',{
      method:'Post',
      body:JSON.stringify(dataWithTime),
      headers:{
        'Content-Type':'application/json'
      }
    })
    results = await results.json()
    if (results) {
      console.log("task added"); 
      settaskData({})
    }
  }
  return (
    <div className='cont'>
      <h1>Add new Task</h1>
      <form onSubmit={handleTask}> 
         <div className='from-top'>
        <label htmlFor="">Title</label>
        <input   value={taskData.title || ""} onChange={(event)=>settaskData({...taskData,title:event.target.value})} type="text"  name='title' placeholder='ENTER TASK TITLE'/>
        <label htmlFor="">Description</label>
        <textarea   value={taskData.description || ""} onChange={(event)=>settaskData({...taskData,description:event.target.value})} rows={4} name="description" id="" placeholder='Enter the Description'></textarea>


        <input
  type="date"  value={taskData.dueDate || ""}
  onChange={(e) =>
    settaskData({ ...taskData, dueDate: e.target.value })
  }
/>
        
        <label>Priority</label>
        
          <select     value={taskData.priority || ""} className={`priority-select ${taskData?.priority || ''}`} onChange={(e) => settaskData({ ...taskData, priority: e.target.value })
  }>
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              
          </select>
         

        <button type='submit' className='submmit'>Add New Task</button>
          </div>
      </form>
    </div>
  )
}

export default AddTask ;