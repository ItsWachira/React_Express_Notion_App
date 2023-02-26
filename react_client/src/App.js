
import './App.css';
import React, { useState} from 'react';
import Axios from 'axios';


function App() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [APIData, setAPIData] = useState([]);


  // .then(response => {response.json()})

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:8000/NotionAPIPost', {
      Fullname: name,
      CompanyRole:role,
      Location:location

     }).catch(error => {
   
      console.log(error);
    })
     

    Axios.get('http://localhost:8000/NotionAPIGet')
      .then(response => {
        setAPIData(response.data.results);
        console.log(response.data.results);
      }).catch(error => {
   
        console.log(error);
      })
     
  
  };

  return (
    <div className="App">
      <header className="App-header">
      <div className="form">
            <form onSubmit={handleSubmit}>
                <p>Full Name</p>
                  <input
                  type="text" 
                  placeholder="Full name ..."
                  onChange={(e) => {setName(e.target.value)}}
                />

                <p> Company Role</p>
                <input 
                  type="text" 
                  placeholder = "Company Role...." 
                  onChange={(e) => {setRole(e.target.value)}}
                />
                <p> Company Role</p>
                <input 
                  type="text" 
                  placeholder = "Location...." 
                  onChange={(e) => {setLocation(e.target.value)}}
                  />
                  <button type="submit">Submit</button>
            </form>
          </div>
          <div className="Data">
          <p>API DATA</p>
          {
            APIData.map((data) => {
              return (
                <div key={data.id}>
                 
                   <p> Name: {data.properties.Fullname.title[0].plain_text}</p>
                   <p> Role: {data.properties.CompanyRole.rich_text[0].plain_text}</p>
                   <p> Location: {data.properties.Location.rich_text[0].plain_text}</p>              
                
                </div>
              )
            })
          }

          </div>
      </header>
    </div>
  );
}

export default App;
