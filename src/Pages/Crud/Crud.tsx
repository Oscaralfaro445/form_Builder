import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormikValues, useFormik } from "formik";
import { Alert } from "../../Components/Alert/Alert";
import { Button } from "../../Components/Button/Button";
import { Form } from "../../Components/Form/Form";
import { Modal } from "../../Components/Modal/Modal";
import { SectionHeader } from "../../Components";
import { SlideOver } from "../../Components/SlideOver/SlideOver";
import { Table } from "../../Components/Table/Table";
import { AlertState } from "../../Models/Alert/Alert";
import { CrudAction } from "../../Models/metadata";
import { FormHorientation } from "../../Models/metadata";
import { getFilterFields } from "../../Utils/metadata";
import { useMetadata } from "../../Context/useMetadata";

export const Crud = () => {
  const { formKey } = useParams();
  const { fetchFormMetadata, metadata } = useMetadata();
  const [action, setAction] = useState(CrudAction.CREATE);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSlideOpen, setSlideOpen] = useState(false);
  const [alertState, setAlertState] = useState({
    isOpen: true,
    description: "ERROR",
    title: "Este error es un ejemplo del componente Alert",
    type: AlertState.ERROR,
  });

  const formik = useFormik({
    initialValues: {} as FormikValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    fetchFormMetadata(formKey!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formKey]);

  const handleFiltering = () => {};

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <div className="w-full relative">
      <SectionHeader>
        <SectionHeader.Details
          title="Forma"
          description="En esta forma podrás realizar el llenado de una quiniela"
        />
        <SectionHeader.Buttons>
          <Button
            theme="danger"
            title="Eliminar"
            icon="trash-alt"
            onClick={() => {}}
          />
          <Button
            theme="normal"
            title="Agregar"
            icon="plus"
            onClick={() => {
              setAction(CrudAction.CREATE);
              setModalOpen(true);
            }}
          />
          <Button
            theme="primary"
            title="Editar"
            icon="pen-fancy"
            onClick={() => {}}
          />
          <Button
            theme="primary"
            title="Filtros"
            icon="filter"
            onClick={() => {
              setSlideOpen(true);
            }}
          />
        </SectionHeader.Buttons>
      </SectionHeader>

      <Table />

      <Modal
        action={action}
        open={isModalOpen}
        handleAccept={() => {}}
        handleCancel={handleCancel}
        formInitialValues={{}}
      />

      <Alert
        type={alertState.type}
        title={alertState.title}
        isOpen={alertState.isOpen}
        description={alertState.description}
        handleExit={() => setAlertState({ ...alertState, isOpen: false })}
      />

      <SlideOver
        isOpen={isSlideOpen}
        setOpen={setSlideOpen}
        handleFormSubmit={handleFiltering}
      >
        {metadata && (
          <Form
            fields={getFilterFields(metadata?.infComponente)}
            hasValidation={false}
            formHandler={formik}
            position={FormHorientation.HORIZONTAL}
          />
        )}
      </SlideOver>
    </div>
  );
};
