import { useState, useEffect } from 'react';
import './Form.css';
import image from './headerimage.jpg';

function Form() {

    const getData = () => {
        const data = localStorage.getItem('items')
        if (data) {
            return JSON.parse(data);
        }
        else {
            return []
        }
    }

    const [items, setItems] = useState(getData());

    const [data, setData] = useState('')

    const [error, setErrors] = useState({ data: '' })

    const getFormData = (e) => {
        e.preventDefault();
        let errorCount = 0;
        if (data === '') {
            errorCount++
            setErrors((prevState) => {
                return { ...prevState, data: "data is required" }
            })
        }
        else {
            setErrors((prevState) => {
                return { ...prevState, data: "" }
            })
        }
        if (errorCount === 0) {
            let item = {
                data
            }
            setItems([...items, item]);
            setData('')

        }
    }

    const cancelFormData = (e) => {
        e.preventDefault();
        setData('')
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(items))
    }, [items])

    return (
        <div className="container">
            <div className="form">
                <div className='imag'>
                    <div className='content'>
                        <img src={image}/>
                    </div>
                </div>
                <form onSubmit={getFormData}>
                    <input type="text" placeholder="Enter your work" name='data' value={data} onChange={(e) => setData(e.target.value)} /><br></br>{error.data && <span className='error'>{error.data}</span>}<br></br>
                    <button type='submit' className='submit'>Add</button> <button type='clear' className='cancle' onClick={cancelFormData}>clear</button>
                </form>
            </div>
            <div className='userdata'>
                <h1 className='heading2'>To-do data</h1>
                {
                    items.map((elem, ind) => {
                        return (
                            <ul>
                            <li>{elem.data}</li>
                            </ul>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Form;