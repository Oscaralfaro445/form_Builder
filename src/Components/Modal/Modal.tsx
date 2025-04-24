import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useRef } from "react";
import { useMetadata } from "../../Context/useMetadata";
import { FormWrapper } from "../FormWrapper/FormWrapper";
import { CrudAction } from "../../Models";
import { Window } from "../Window/Window";

type ModalProps = {
  open: boolean;
  action: CrudAction;
  handleCancel: () => void;
  handleAccept: (values: any) => void;
  formInitialValues?: { [key: string]: any };
};

export const Modal = ({
  open,
  action,
  handleAccept,
  handleCancel,
  formInitialValues,
}: ModalProps) => {
  const { metadata } = useMetadata();
  const cancelButtonRef = useRef(null);

  const renderView = () => {
    switch (metadata?.infoForma?.cveTipoForma) {
      case "VENTANA":
        return <Window action={action} />;
      default:
        return null;
    }
  };

  return (
    <Transition show={open}>
      <Dialog
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={handleCancel}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0">
          {/* Overlay */}
          <TransitionChild
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          {/* Espacio para centrar */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <TransitionChild
            enter="ease-out duration-500"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel className="inline-block align-bottom bg-red-400 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-5/6">
              <FormWrapper
                initialValues={() => {
                  console.log(formInitialValues);
                }}
                onSubmit={handleAccept}
                fields={metadata?.infComponente}
              >
                {(formik: any) => (
                  <>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                          {open && renderView()}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        className={`w-full inline-flex items-center justify-center rounded-md border shadow-sm px-4 text-base font-medium text-gray-500 border-gray-400 sm:ml-3 sm:w-auto sm:text-sm ${!formik.isValid ? "opacity-50" : ""}`}
                        onClick={() => handleAccept(formik.values)}
                        disabled={!formik.isValid || formik.isSubmiting}
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
                  </>
                )}
              </FormWrapper>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};
