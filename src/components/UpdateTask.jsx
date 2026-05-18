import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/addtask.css'; // Reusing your awesome 3D Cyber-Panel CSS!

const UpdateTask = () => {
  const { id } = useParams(); // Grabs the task ID from the URL (e.g., /update/123)
  const navigate = useNavigate();
  
  // Initialize state with empty values so the form doesn't crash before data loads
  const [taskData, settaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: ""
  });

  // 1. Fetch the existing task data as soon as the page loads
  useEffect(() => {
    const getTaskDetails = async () => {
      try {
       // let response = await fetch(`http://localhost:3500/task/${id} credentials:'include'`);
       let response = await fetch(`http://localhost:3500/task/${id}`, { 
        credentials: 'include' 
});
        let data = await response.json();
        
        if (data.success) {
          // Pre-fill the form with the database data
          settaskData(data.result); 
        }
      } catch (error) {
        console.log("Error fetching task details:", error);
      }
    };
    
    if (id) {
      getTaskDetails();
    }
  }, [id]);

  // 2. Handle the Form Submission to Update
  const handleUpdate = async (e) => {
    e.preventDefault(); // 🚫 stop page reload
    
    try {
      let response = await fetch(`http://localhost:3500/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(taskData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      let result = await response.json();
      
      if (result.success) {
        console.log("Task successfully updated!"); 
        navigate('/'); // 🚀 Send user back to the main List page
      }
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  return (
    <div className='cont'>
      <h1>Update Task</h1>
      <form onSubmit={handleUpdate}> 
         <div className='from-top'>
         
        <label>Title</label>
        <input   
          value={taskData.title || ""} 
          onChange={(event) => settaskData({...taskData, title: event.target.value})} 
          type="text"  
          name='title' 
          placeholder='ENTER TASK TITLE'
          required
        />
        
        <label>Description</label>
        <textarea   
          value={taskData.description || ""} 
          onChange={(event) => settaskData({...taskData, description: event.target.value})} 
          rows={4} 
          name="description" 
          placeholder='Enter the Description'
        ></textarea>

        <label>Due Date</label>
        <input
          type="date"  
          value={taskData.dueDate || ""}
          onChange={(e) => settaskData({ ...taskData, dueDate: e.target.value })}
        />
        
        <label>Priority</label>
        <select     
          value={taskData.priority || ""} 
          className={`priority-select ${taskData?.priority || ''}`} 
          onChange={(e) => settaskData({ ...taskData, priority: e.target.value })}
        >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>

        <button type='submit' className='submmit'>Save Changes</button>
         </div>
      </form>
    </div>
  )
}

export default UpdateTask;