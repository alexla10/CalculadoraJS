import './App.css';
import Boton from './componentes/Boton';
import BotonClear from './componentes/BotonClear';
import { Pantalla } from './componentes/Pantalla';
import { useState } from "react";
import {evaluate} from 'mathjs'

function App() {
  const [input, setinput] = useState('')
  const [lastResult, setLastResult] = useState(null);

  const isValidInput = (valor) => {
    // Si es un operador, no permitir operadores consecutivos
    if (['+', '-', '*', '/'].includes(valor)) {
      const lastChar = input.slice(-1); // Último carácter de la entrada
      return !['+', '-', '*', '/'].includes(lastChar); // No permitir operadores consecutivos
    }
    
    // Si es un punto decimal, verificar que no haya múltiples puntos en el mismo número
    if (valor === '.') {
      const lastNumber = input.split(/[\+\-\*\/]/).pop(); // Último número antes del operador
      return !lastNumber.includes('.'); // No permitir múltiples puntos en el mismo número
    }

    return true; // Si es un número o un operador válido, es válido
  };

  const agregarInput = valor =>{
    if(isValidInput(valor)){
      setinput(input + valor)
    }else{
      alert('operacion incorrecta')
    }
    
    /*if (lastResult !== null && !isNaN(valor) && valor !== '.') {
      setinput(valor); // Si es un número, lo mostramos como nuevo número
    } else {
      // Si hay un resultado previo y el usuario agrega un operador, concatenamos el operador
      if (lastResult !== null && ['+', '-', '*', '/'].includes(valor)) {
        setinput(lastResult + valor); // Usamos el resultado previo + operador
      } else {
        setinput(input + valor); // Sino, añadimos el valor al input
      }
    }*/
  };

  const calcularResultado = () =>{
    /*if(input){
      setinput(evaluate(input))
    }else{
      alert("Porfavor ingrese valores")
    }*/
      if (input) {
        try {
          // Si hay un resultado previo, lo usamos para continuar la operación
          let resultado;
          if (lastResult !== null) {
            console.log(`${lastResult}${input}`)
            resultado = evaluate(`${input}`); // Operación continua
          } else {
            resultado = evaluate(input); // Si no hay resultado previo, solo evaluamos la entrada
          }
  
          setinput(resultado.toString()); // Mostrar el resultado en la pantalla
          setLastResult(resultado); // Guardar el resultado para futuras operaciones
        } catch (error) {
          setinput('Error'); // Si hay un error, mostrarlo
        }
      } else {
        alert("Por favor ingrese valores");
      }
    
  };



  return (
    <div className="App">
      <div className="contenedor-calculadora">
        <Pantalla input={input}/>
        <div className="fila">
          <Boton manejarClick={agregarInput}>7</Boton>
          <Boton manejarClick={agregarInput}>8</Boton>
          <Boton manejarClick={agregarInput}>9</Boton>
          <Boton manejarClick={agregarInput}>+</Boton>
        </div>

        <div className="fila">
          <Boton manejarClick={agregarInput}>4</Boton>
          <Boton manejarClick={agregarInput}>5</Boton>
          <Boton manejarClick={agregarInput}>6</Boton>
          <Boton manejarClick={agregarInput}>-</Boton>
        </div>

        <div className="fila">
          <Boton manejarClick={agregarInput}>1</Boton>
          <Boton manejarClick={agregarInput}>2</Boton>
          <Boton manejarClick={agregarInput}>3</Boton>
          <Boton manejarClick={agregarInput}>*</Boton>
        </div>

        <div className="fila">
          <Boton manejarClick={agregarInput}>.</Boton>
          <Boton manejarClick={agregarInput}>0</Boton>
          <Boton manejarClick={calcularResultado}>=</Boton>
          <Boton manejarClick={agregarInput}>/</Boton>
        </div>

        <div className="fila">
          <Boton manejarClick={agregarInput}>(</Boton>
          <Boton manejarClick={agregarInput}>)</Boton>
          <Boton manejarClick={agregarInput}>%</Boton>
          <BotonClear manejarClear={() => setinput('')}>C</BotonClear>
        </div>

      </div>
    </div>
  );
}

export default App;
