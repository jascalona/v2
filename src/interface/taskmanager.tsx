import TabsTaskMnagaer from "./setting/component/tabs/tabs_task"

//COmponentes
import CardRequest from "./setting/component/card/card_solicitud";


function TaskManager() {
    return (
        <>

            <div className="container-request" style={{marginBottom: 30}}>
                <CardRequest />
                <CardRequest />
                <CardRequest />
            </div>

            <div className="container-taskmanager">
                <TabsTaskMnagaer />
            </div>
        </>
    )
}

export default TaskManager