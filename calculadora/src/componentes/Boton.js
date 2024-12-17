import React from 'react'
import '../estilos/Boton.css'

export default function Boton(props) {
    const esOperador = valor =>{
        return isNaN(valor) && (valor !== '.') && (valor !=='=') && (valor !==';')
    }

  return (
    <button className={`boton-contenedor ${esOperador(props.children) ? 'operador' : ''}`.trimEnd()}
      onClick={() => props.manejarClick(props.children)}>
        {props.children}
    </button>
  )
}
