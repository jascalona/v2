import { useState } from "react";
import ProjectExplorer from './component/view_project';

function Project(){
    return(
        <>
            <div className="show-nav">
                <ProjectExplorer />
            </div>
        </>
    )
}
export default Project