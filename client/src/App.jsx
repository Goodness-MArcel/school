import React,{useState , useEffect} from "react";
import Signup from "./component/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [text, setText] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:3000/api/example')
    .then(res => res.json())
    .then(data => setText(data))
    .catch(err => console.error('Error fetching data:', err));
  },[])
  return (
    <div className="App">
      <Signup />
      {text.map((user, index) => (
  <div key={index}>{user.name}</div>
))}

    </div>
  );
}

export default App;