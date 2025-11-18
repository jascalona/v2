import { useState } from "react";
import ProjectExplorer from './setting/component/view_project';

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