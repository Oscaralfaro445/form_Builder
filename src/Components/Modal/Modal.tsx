import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useRef } from "react";
import { CrudAction } from "../../Models/metadata";
import { useMetadata } from "../../Context/useMetadata";
import { FormikValues, useFormik } from "formik";
import { Window } from "../Window/Window";

type ModalProps = {
  open: boolean;
  action: CrudAction;
  handleCancel: () => void;
  handleAccept: (a: any) => void;
  formInitialValues: { [key: string]: any };
};

export const Modal = ({
  open,
  action,
  formInitialValues,
  handleAccept,
  handleCancel,
}: ModalProps) => {
  const { metadata } = useMetadata();

  const cancelButtonRef = useRef(null);
  const formik = useFormik({
    initialValues: {} as FormikValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const getInitualValues = (formInitialValues: any, metadata: any) => {
    console.log("FormInitialValues", formInitialValues, "metadata", metadata);
  };

  useEffect(() => {
    if (!metadata) return;

    const formValue = getInitualValues(formInitialValues, metadata);
    formik.setValues(formValue as any, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formInitialValues, metadata]);

  const renderView = () => {
    switch (metadata?.infoForma.cveTipoForma) {
      case "VENTANA":
        return <Window action={action} formHandler={formik} />;
      default:
        return null;
    }
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => {}}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPanel className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-5/6">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    {open && renderView()}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center rounded-md border shadow-sm px-4 text-base font-medium text-gray-500 border-gray-400 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleAccept(formik.values)}
                >
                  Aceptar
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleCancel}
                  ref={cancelButtonRef}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};
