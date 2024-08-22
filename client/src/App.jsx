import Login from "./components/Login"
import Signup from "./components/Signup"
import{Route,Routes,Navigate}from 'react-router-dom'
import UserScreen from "./components/UserScreen"
import AdminScreen from "./components/AdminScreen"
function App() {

  return (
    <>
    <Routes>
     <Route path="/" element={<Navigate to="/login" />} />
      <Route exact path="/login" element={<Login/>}/>
      <Route  path="/signup" element= {<Signup/>}/>
      <Route path="/details" element={<UserScreen/>} />  
      <Route  path='/admin' element={<AdminScreen/>}/>
    </Routes>
    </>
  )
}

export default App
