import React, { useState, useEffect } from 'react'

function Delivery({id}) {
    const [state, setState]= useState({})
    const [refresh, setRefresh] = useState(false);

    useEffect(()=>{
        (async () => {
            const response = await fetch(`http://localhost:8000/deliveries/01HR7VHWJ0DMQ2R4F5PH10X5D8/status`)
            // const response = await fetch(`http://localhost:8000/deliveries/${id}/status`)
            const data= await response.json();
            setState(data);
        })()
    }, [refresh])

    const submit = async (e, type) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const form = new FormData(e.target);
        const data = Object.fromEntries(form.entries());
        console.log(state.id)

        const raw = JSON.stringify({
            "type": type,
            "delivery_id": state.id,
            "data": data
          });
          
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
          };


        fetch("http://localhost:8000/event", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("result", result)
                // alert(result.detail)
            })
            .catch((error) => console.error(error));
        setRefresh(!refresh);
    }
  return (
    <div className='row w-100'>
        <div className='col-12 mb-4'>
            <h4 className='fw-bold text-white'>Delivery {state.id}</h4>
        </div>
        <div className='col-12 mb-5'>
            <div className="progress">
                {state.status !== 'ready' ?
                <div className={state.status === 'active' ? 'progressbar bg-success progress-bar-striped progress-bar-animated' : "progress-bar bg-success"} role='progressbar' style={{width:'50%'}}></div> : ''}
                {state.status === 'collected' || state.status === 'completed' ?
                <div className={state.status === 'collected' ? 'progressbar bg-success progress-bar-striped progress-bar-animated' : "progress-bar bg-success"} role='progressbar' style={{width:'50%'}}></div> : ''}
            </div>
        </div>
        <div className='col-3'>
            <div className="card">
                <div class="card-header">
                    Start Delivery
                </div>
                <form className="card-body" onSubmit={e => submit(e, "START_DELIVERY")}>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>

        <div className='col-3'>
            <div className="card">
                <div class="card-header">
                    Increase Budget
                </div>
                <form className="card-body" onSubmit={e => submit(e, "INCREASE_BUDGET")}>
                    <div className='input-group mb-3'>
                        <input type="number" name="budget" className='form-control' placeholder='Budget'/>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>

        <div className='col-3'>
            <div className="card">
                <div class="card-header">
                    Pickup Products
                </div>
                <form className="card-body" onSubmit={e => submit(e, "PICKUP_PRODUCTS")}>
                    <div className='input-group mb-3'>
                        <input type="number" name="purchase_price" className='form-control' placeholder='Purchase Price'/>
                        <input type="number" name='quantity' className='form-control' placeholder='Quantity'/>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>

        <div className='col-3'>
            <div className="card">
                <div class="card-header">
                    Deliver Products
                </div>
                <form className="card-body" onSubmit={e => submit(e, "DELIVER_PRODUCTS")}>
                    <div className='input-group mb-3'>
                        <input type="number" name="sell_price" className='form-control' placeholder='Sell Price'/>
                        <input type="number" name='quantity' className='form-control' placeholder='Quantity'/>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        <code className='col-12 mt-4'>
            {JSON.stringify(state)}
        </code>
    </div>
  )
}

export default Delivery