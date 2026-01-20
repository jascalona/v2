import TabsActivities from '../setting/component/tabs/tabs_activities'
import { useAuth } from "../config/AuthContext";
import '../../assets/css//activiades..css'


function Activities() {

    const { user } = useAuth();

    return (
        <>
            <h2 className="title-activiti">Hola,  <strong>{user?.nb_nombre}</strong> Bienvenid@ al panel de actividades </h2>
            <TabsActivities />
        </>
    )
}
export default Activities