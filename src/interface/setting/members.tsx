import { useState } from "react";
import CardUser from './component/card_user';
import TableMembers from "./component/table_user";
import '../../assets/css/card_users.css';
import { red } from "@mui/material/colors";

function Members() {

    return (
        <>
            <div className="content-header fondo">
                <h2 style={{ color: '#fff' }}>👥 Gestion de Usuarios</h2>

                <p style={{ color: '#c5c4c4ff' }}>
                    <span className="header-emoji">⚡</span> Jueves, 13 de noviembre, 22:19
                </p>
            </div>


            <div className="gallery_card_user">
                <CardUser nameSubara="INGENIERIA DE SOFTWARE" />
                <CardUser nameSubara="GESTION DE SERVICIOS" />
                <CardUser nameSubara="INFRAESTRUCTURA" />
                <CardUser nameSubara="GERENCIA" />
            </div>

            
            <TableMembers />



        </>
    )
}
export default Members