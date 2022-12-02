import './App.css';
import { useState } from 'react'
import axios from 'axios';

function App() {
  const [inputAngka, setInputAngka] = useState('')
  const [dataAngka, setDataAngka] = useState({})
  const onGenerateSegitiga = (bilangan) => {
    axios.get(`http://127.0.0.1:8000/api/generate/${bilangan}/${inputAngka}`)
      .then(({ data }) => {
        const response = data || {}
        setDataAngka(response)
      }).catch(() => {
        setDataAngka({})
      })
  }

  const validasiValue = ({target}) => {
    const numbers = /^[0-9]+$/;
    if(target.value.match(numbers) ) {
      setInputAngka(target.value || '')
    }
    
  }
  
  console.log('dataAngka', dataAngka)
  return (
      <>
        <div style={{ padding: '20px' }}>
          <input type="text" placeholder='Input Angka' value={inputAngka} onChange={validasiValue}/> 
          <br /><br />
          <button type="button" onClick={() => onGenerateSegitiga('segitiga')}> Generate Segitiga</button> 
          <button type="button" onClick={() => onGenerateSegitiga('ganjil')}> Generate Bilangan Ganjil</button>
          <button type="button" onClick={() => onGenerateSegitiga('prima')}> Generate Bilangan Prima</button>

          <p>Result : </p>
          {dataAngka.message === 'success' && 
            dataAngka.angka.length > 0 && dataAngka.angka.map((item, number) => (
              <div key={number}>{item}</div>
          ))}
        </div>
      </>
    );
}

export default App;
