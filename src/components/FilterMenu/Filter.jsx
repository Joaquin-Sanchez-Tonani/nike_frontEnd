import { useEffect, useState } from 'react';
import './Filter.css'

function Filter({setCategory,category}){
    const [valor,setValor] = useState([1,2,3])
    useEffect(()=>{
        try{
            fetch('https://python-backend-9d90.onrender.com/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}) // Si necesitas un cuerpo en el POST
            })
            .then(response => response.json())
            .then(data => {
                setValor(data)}
            )
        }catch(e){
            console.log(e)
        }
    },[]);
    const handleList = (category) =>{
        setCategory(category)
    }
    return(
        <nav className='filter_nav'>
            <h3 className='categories_tittle'>Categorias</h3>
            <ul>
                <li onClick={ () => handleList(0) } className={category == 0 ? 'category active_category' : 'category'}>Todo</li>
                {
                    valor.map((element,key)=>{
                        return <li onClick={ () => handleList(element[0]) } key={key} className={category == element[0] ? 'category active_category' : 'category'}>{element[1]}</li>
                    })
                }
                
            </ul>
        </nav>
    )
}
export default Filter;