import LabelCategory from "../component/label_category";
import ModalCategory from "../component/modal_category";

function Category() {
    return (
        <>
            <div className="dashboard-content">

                <div className="section quick-start-section">

                    <div className="container-setting-general">

                        <div className="other-setting" style={{ marginTop: 40 }}>
                            <h2>Categorias</h2>

                            <div className="h" style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', paddingBottom: '15px' }}>
                                <p>
                                    En este apartado podra administrar y diseñar distintos recursos de su organizacion
                                </p>

                                <div className="section-modal" >
                                    <ModalCategory />
                                </div>
                            </div>


                            {/*CONTENIDO LABELS*/}
                            <LabelCategory />
                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default Category