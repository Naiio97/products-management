import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from "axios";

import '../styles/addProduct.scss';


const Create = () => {
  const navigate = useNavigate();
  
  const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
 
 
  const createProduct = async (e) => {
    e.preventDefault();

    axios.post('http://localhost/php/index.php', inputs).then(function(response){
        console.log(response.data);
        navigate('/Products');
    });

  };

  return (
    <div>
      <main>
        <form onSubmit={createProduct} className="form-create">
          <h1>Nové zařízení</h1>
          <label style={{ display: 'none' }}></label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Název produktu"
            onChange={handleChange}
          />
          

          <label></label>
          <input
            type="text"
            name="detail"
            id="detail"
            placeholder="Popis produktu"
            onChange={handleChange}
          />
          
        
          <button>Přidat produkt</button>
        </form>
      </main>
    </div>
  );
};

export default Create;
