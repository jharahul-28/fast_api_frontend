import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import Delivery from './Delivery';

function App() {
  const [id, setId] = useState ("01HR7VHWJ0DMQ2R4F5PH10X5D8")

  const submit =async (e) =>{
    e.preventDefault();

    // const form = new FormData (e.target);
    // const data = Object.fromEntries(form.entries());
    // const response = await fetch ('https://localhost:8000/event', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({
    //     type: "CREATE_DELIVERY",
    //     data
    //   })
    // });
    // const {id}= await response.json();
    // setId(id)
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const form = new FormData (e.target);
    const data = Object.fromEntries(form.entries());

    const raw = JSON.stringify({
    "type": "CREATE_DELIVERY",
    "data": data
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };


  fetch("http://localhost:8000/deliveries/create", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("result",result)
      setId("01HR7VHWJ0DMQ2R4F5PH10X5D8")
    })
    .catch((error) => console.error(error));
  }


  return (
    <div className="py-5">
      <div className='d-grip gap-2 d-sm-flex justify-content-sm-cente3r mb-5'>
        {id === '' ? <div className="card">
          <div class="card-header">
            Create Delivery
          </div>
          <form className="card-body" onSubmit={submit}>
            <div className="mb-3">
              <input type="number" name="budget" className="form-control" placeholder="Budget"/>
            </div>
            <div className="mb-3">
              <input type="textarea" name="notes" className="form-control" placeholder="Notes"/>
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div> : <Delivery id={id}/>}
      </div>
    </div>
    
  );
}

export default App;
