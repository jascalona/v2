import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import axios from 'axios';


// Definición de datos estáticos dentro del componente
const DATA_STATIC = {
    companyName: "Soluciones Sycom",
    attendeesCount: 6, 
};

interface INTERFACE_DATA{
    nameSubara: string,
}

const dummyAvatarsArray = Array(DATA_STATIC.attendeesCount)
    .fill(0)
    .map((_, index) => <AccountCircleIcon key={index} className="avatar-icon" />);

function CardUser({nameSubara}: INTERFACE_DATA) {
    // Ya no se necesita el estado ni la interfaz de props.

    return (
        <>
            <div className="card-resumen">
                <div className="card-container">
                    <div className="header">
                        <div className="logo-container">
                            <span className="logo">SS</span>
                        </div>
                        <div className="company-info">
                            <div className="company-name">{DATA_STATIC.companyName}</div> 
                        </div>
                    </div>

                    <p className="message">
                        Total de Miembros por departamento
                    </p>

                    <p className="name-area">
                       {nameSubara}  <span><strong>10</strong></span>
                    </p>

                    <div className="footer">
                        <button className="join-button">
                            VER
                        </button>
                        <div className="avatars">
                            {/* Renderiza un máximo de 4 avatares simulados */}
                            {dummyAvatarsArray
                                .slice(0, Math.min(DATA_STATIC.attendeesCount, 4))
                                .map((avatar, index) => (
                                    <span 
                                        key={index}
                                        className="avatar-wrapper"
                                        title={`Asistente ${index + 1}`}
                                    >
                                        {avatar}
                                    </span>
                            ))}
                            {/*Mostrar contador si hay más de 4 asistentes */}
                            {DATA_STATIC.attendeesCount > 4 && (
                                <div className="attendees-count">
                                    + {DATA_STATIC.attendeesCount - 4}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CardUser;