
import React from 'react';

const TarjetaJuego = ({ juego }) => {

    const cardStyle = {
        border: '1px solid #2ef60bff',
        padding: '15px',
        margin: '10px',
        borderRadius: '8px',
        boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
    };

    return (
        
        <div style={cardStyle}>
            <h3>{juego.title}</h3>
            <p><strong>Género:</strong> {juego.genre}</p>
            <p><strong>Plataforma:</strong> {juego.platform}</p>
            <p><strong>Puntuación:</strong> {juego.rating} / 5</p>
            
            {/* Botones de acción usando funciones JavaScript */}
            <button onClick={() => alert(`Editando ${juego.title}`)}>Editar</button>
            <button onClick={() => alert(`Eliminando ${juego.title}`)}>Eliminar</button>
        </div>
    );
};

export default TarjetaJuego;