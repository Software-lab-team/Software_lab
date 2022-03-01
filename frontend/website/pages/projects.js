import Header from '../components/header'
import React, { useState } from 'react';

/*
//Function to do the API call
export const getStaticProps = async () =>{

  const res = await fetch('https://jsonplaceholder.typicode.com/users') 
  const data = await res.json()

  return {
    props: {users : data}
  }

}




//Receives the api information under props. In this case, I diconstructed the props thing so that I only have to recieve the data. 
//The map function gets called for every element in the array. So basically, it creates a div for every user on the list. Will need to do this
//Use state allows me to change the data when I fetch the API again


export default function Home({users}){

  const [data, setData] = useState(users)

  const fetchData = async () => {
    const req = await fetch('https://jsonplaceholder.typicode.com/comments') 
    const new_data = await req.json()
    return setData(new_data)
  }

  const handleClick = (event) =>{
    event.preventDefault()
    fetchData()
  }

  return(
    <div>
      <Header />
      <button onClick = {handleClick}> Test calling API</button>
      {data.map(user =>(
        <div key={user.id}>
          <a>
            <h3>
              {user.email}
            </h3>
          </a>
        </div>
      ))}
    </div>
  )  
}
*/


export default function Home(){
  return(
    <div>
      <Header />
    </div>
  )
}


