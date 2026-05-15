
import './style/App.css'
import Navbar from './components/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import AddTask from './components/AddTask.jsx'
import List from './components/List.jsx'
import UpdateTask from './components/UpdateTask.jsx'
import SignUp from './components/SignUp.jsx'

function App() {
 

  return (
   <>
   <Navbar />
   <Routes>
    <Route path='/' element={<List/>}/>
    <Route path='/add' element={<AddTask/>}/>
    <Route path="/update/:id" element={< UpdateTask />} />
    <Route path="//signup" element={<SignUp/>} />
   </Routes>
   </>
  )
}

export default App
 