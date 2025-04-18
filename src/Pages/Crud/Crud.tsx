import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "../../Components/Alert/Alert";
import { Button } from "../../Components/Button/Button";
import { Modal } from "../../Components/Modal/Modal";
import { SectionHeader } from "../../Components";
import { SlideOver } from "../../Components/SlideOver/SlideOver";
import { Table } from "../../Components/Table/Table";
import { AlertState } from "../../Models/Alert/Alert";
import { CrudAction } from "../../Models/metadata";
import { getFilterFields } from "../../Utils/metadata";
import { useMetadata } from "../../Context/useMetadata";
import { FormStructure } from "../../Components/FormStructure/FormStructure";

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

  useEffect(() => {
    fetchFormMetadata(formKey!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formKey]);

  const handleFiltering = () => {};

  const handleAccept = (values: any) => {
    console.log("Accepted", values);
    console.log(action);
  };

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
        open={true}
        handleAccept={handleAccept}
        handleCancel={handleCancel}
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
          <FormStructure
            fields={getFilterFields(metadata.infComponente)}
            onSubmit={() => {}}
          />
        )}
      </SlideOver>
    </div>
  );
};
