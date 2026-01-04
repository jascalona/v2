import LabelSubCategory from "../component/labels/label_subcomponente";
import ModalSubCategory from "../component/modal/modal_subcategory";

function SubCategory() {
    return (
        <>
            <div className="dashboard-content">

                <div className="section quick-start-section">

                    <div className="container-setting-general">

                        <div className="other-setting" style={{ marginTop: 40 }}>
                            <h2>Sub Caregorias</h2>

                            <div className="h" style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', paddingBottom: '15px' }}>
                                <p>
                                    En este apartado podra administrar y diseñar distintos recursos de su organizacion
                                </p>

                                <div className="section-modal" >
                                    <ModalSubCategory />
                                </div>
                            </div>


                            {/*CONTENIDO LABELS*/}
                            <LabelSubCategory />
                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default SubCategory