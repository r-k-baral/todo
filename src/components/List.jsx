import React, { useEffect, useState } from 'react'
import "../style/list.css"
import { Link, useNavigate } from 'react-router-dom';

const List = () => {
  const [search, setSearch] = useState("");
const [filterPriority, setFilterPriority] = useState("");
const [filterStatus, setFilterStatus] = useState("");
    const [taskData, settaskData] = useState([]);
    const navigate = useNavigate()
    useEffect(()=>{
        getlistData()
    },[])

   async function   getlistData(){
        let response = await fetch('http://localhost:3500/tasks',{
          credentials:'include'
        }); 

        if (response.status === 401) {
        localStorage.removeItem('login');
        localStorage.removeItem('userName');
        navigate('/login');
        return;
      }

      const list = await response.json();
      console.log(list);
      
       if(list.success){
        settaskData(list.result)
       }
      
       
    }
    const formatTimeAgo = (date) => {
  if (!date) return "";

  const now = new Date();
  const taskDate = new Date(date);

  const diffMs = now - taskDate;
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return "Just now";

  if (diffMin < 60)
    return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;

  if (diffHr < 24)
    return `${diffHr} hour${diffHr === 1 ? '' : 's'} ago`;

  if (diffDay === 1) return "Yesterday";

  if (diffDay < 7)
    return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;

  return taskDate.toLocaleDateString();
};

const toggleComplete = async (id) => {
  try {
    await fetch(`http://localhost:3500/task/${id}`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    });

    getlistData();
  } catch (error) {
    console.log("Error:", error);
  }



};
  // adding sorting
const priorityOrder = {
  high: 3,
  medium: 2,
  low: 1
};

const sortedTasks = [...taskData].sort((a, b) => {

  const priorityDiff =
    (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);

  if (priorityDiff !== 0) {
    return priorityDiff; 
  }

  const dateA = a.dueDate ? new Date(a.dueDate) : new Date(8640000000000000);
  const dateB = b.dueDate ? new Date(b.dueDate) : new Date(8640000000000000);

  return dateA - dateB; 
});

// filter search 


const filteredTasks = sortedTasks.filter((item) => {

  
  const matchSearch = (item.title || "")
    .toLowerCase()
    .includes(search.toLowerCase());

  
  const matchPriority = filterPriority
    ? item.priority === filterPriority
    : true;

  //  Status filter
  const matchStatus =
    filterStatus === "completed"
      ? item.completed === true
      : filterStatus === "pending"
      ? item.completed === false
      : true;

  return matchSearch && matchPriority && matchStatus;
});

// deleting the task 
const deletetask =  async(id)=>{
 let itemToDel = await fetch('http://localhost:3500/delete/'+id,{method:'delete',credentials:'include',}); 
       itemToDel = await itemToDel.json();
      console.log("itemToDel");
      
       if(itemToDel.success){
         getlistData()
       
        
       }
      
}
  return (
    <div className='Task-list'>
      <h1>To Do List</h1>

      
      <ul className="list">

        <div style={{ marginBottom: "15px" }}>
  {/*  Search */}
  <input
    type="text"
    placeholder="Search task..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  {/*  Priority filter */}
  <select onChange={(e) => setFilterPriority(e.target.value)}>
    <option value="">All Priority</option>
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
  </select>

  {/* Status filter */}
  <select onChange={(e) => setFilterStatus(e.target.value)}>
    <option value="">All</option>
    <option value="completed">Completed</option>
    <option value="pending">Pending</option>
  </select>
</div>





<li className="list-header">
  <span>S.no</span>
  <span>Title</span>
  <span>Description</span>
  <span>Due Date</span>
  <span>Time</span>
  <span>Priority</span>
  <span>Status</span>
  <span>Actions</span>
</li>
 

 {/* // only for data display */}
{/* // {taskData && taskData.map((item, index) => { */}
{/* // only for data sort show */}
  {/* {sortedTasks && sortedTasks.map((item, index) => { */}
{/* // now show data filter */}
{filteredTasks && filteredTasks.map((item, index) => {
  const isOverdue =
    item.dueDate && new Date(item.dueDate) < new Date();

  return (
   <li
  className={`list-row ${isOverdue ? 'overdue' : ''}`}
  key={index}
>
  <span>{index + 1}</span>
  <span>{item.title}</span>
  <span>{item.description}</span>
  

  <span>{item.dueDate || "No date"}</span>
  <span>{formatTimeAgo(item.createdAt)}</span>

  <span className={`priority-dot ${item.priority}`}></span>
  <input
  type="checkbox"
  checked={item.completed || false}
  onChange={() => toggleComplete(item._id)}
  
/>
<span><button className='rowbutton' onClick={()=>deletetask(item._id)}>Delete</button></span>
<Link to={"update/"+item._id} className='rowbutton'>Update</Link>
</li>
  );
})}
</ul>
    </div>
  )
}

export default List