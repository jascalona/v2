import { useState } from "react";


// Componentes
import CardRequest from "./setting/component/card/card_solicitud";


function UIRequest(){
    return(
        <>
            <div className="container-request">
                <CardRequest />
            </div>
        </>
    )
}
export default UIRequest