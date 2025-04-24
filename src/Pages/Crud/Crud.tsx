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
import { useMetadata } from "../../Context/useMetadata";

export const Crud = () => {
  const { formKey } = useParams();
  const { fetchFormMetadata, metadata } = useMetadata();

  const [action, setAction] = useState(CrudAction.CREATE);
  const [isFetching, setIsFetching] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSlideOpen, setSlideOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>({
    row: null,
    data: {},
  });
  const [alertState, setAlertState] = useState({
    isOpen: false,
    description: "",
    title: "",
    type: AlertState.ERROR,
  });

  useEffect(() => {
    fetchFormMetadata(formKey!);
    setSelectedRow({ row: null, data: {} });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formKey]);

  const handleFiltering = () => {};

  const handleSelectedRow = (row: number, data: any) => {
    if (row === selectedRow.row) {
      setSelectedRow({ row: null, data: {} });
      return;
    }

    setSelectedRow({ row, data });
  };

  const handleCancel = () => {
    setSelectedRow({ row: null, data: {} });
    setModalOpen(false);
  };

  const handleCreate = (values: any) => {
    try {
      setIsFetching(true);
      console.log("Valores del formulario", values);
      // Se hace la llamada a la API para crear el registro
      setIsFetching(false);
      setModalOpen(false);
      setAlertState({
        isOpen: true,
        description: "Se creo correctamente el registro",
        title: "Completado",
        type: AlertState.SUCCESS,
      });
    } catch (error) {
      setIsFetching(false);
      setAlertState({
        isOpen: true,
        description: `Ocurrio un error al crear el registro (${error})`,
        title: "Error",
        type: AlertState.ERROR,
      });
    }
  };

  const handleUpdate = () => {
    try {
      setIsFetching(true);
      // Se hace la llamada a la API para actualizar el registro
      setIsFetching(false);
      setModalOpen(false);
      setAlertState({
        isOpen: true,
        description: "Se actualizo el registro correctamente",
        title: "Completado",
        type: AlertState.SUCCESS,
      });
    } catch (error) {
      setIsFetching(false);
      setAlertState({
        isOpen: true,
        description: `Ocurrio un error al actualizar el registro (${error})`,
        title: "Error",
        type: AlertState.ERROR,
      });
    }
  };
  const handleDelete = () => {
    try {
      setIsFetching(true);
      // Se hace la llamada a la API para eliminar el registro
      setIsFetching(false);
      setModalOpen(false);
      setAlertState({
        isOpen: true,
        description: "Se actualizo el registro correctamente",
        title: "Completado",
        type: AlertState.SUCCESS,
      });
    } catch (error) {
      setIsFetching(false);
      setAlertState({
        isOpen: true,
        description: `Ocurrio un error al actualizar el registro (${error})`,
        title: "Error",
        type: AlertState.ERROR,
      });
    }
  };

  const getCrudHandler =
    action === CrudAction.CREATE ? handleCreate : handleUpdate;

  return (
    <div className="w-full relative bg-amber-500">
      <SectionHeader>
        <SectionHeader.Details
          title={metadata?.infoForma.txTituloForma}
          description={metadata?.infoForma.descForma}
        />
        <SectionHeader.Buttons>
          {selectedRow.row !== null && (
            <Button
              theme="danger"
              title="Eliminar"
              icon="trash-alt"
              onClick={() => handleDelete()}
            />
          )}
          {selectedRow.row === null && (
            <Button
              theme="normal"
              title="Agregar"
              icon="plus"
              onClick={() => {
                setAction(CrudAction.CREATE);
                setModalOpen(true);
              }}
            />
          )}
          {selectedRow.row !== null && (
            <Button
              theme="primary"
              title="Editar"
              icon="pen-fancy"
              onClick={() => {
                setAction(CrudAction.UPDATE);
                setModalOpen(true);
              }}
            />
          )}

          <div className="border-l border-gray-200 h-12 ml-1 mr-2 w-1 "></div>

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

      <Table
        selectedRow={selectedRow.row}
        handleSelectedRow={handleSelectedRow}
        externalLoading={isFetching}
      />

      <Modal
        action={action}
        open={isModalOpen}
        handleAccept={getCrudHandler}
        handleCancel={handleCancel}
        formInitialValues={selectedRow.data}
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
      />
    </div>
  );
};
