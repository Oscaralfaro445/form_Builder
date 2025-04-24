import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../Button/Button";
import { FormWrapper } from "../FormWrapper/FormWrapper";
import { getFilterFields } from "../../Utils/metadata";
import { useMetadata } from "../../Context/useMetadata";
import { Form } from "../Form/Form";

export const SlideOver = ({ isOpen, setOpen, handleFiltering }: any) => {
  const { metadata } = useMetadata();
  const fieldsFiltering = getFilterFields(metadata?.infComponente || []);
  console.log("fieldsFiltering", fieldsFiltering);

  return (
    <Transition show={isOpen}>
      <Dialog className="fixed inset-0 overflow-hidden z-50" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          {/* Overlay oscuro */}
          <TransitionChild
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          {/* Contenedor del SlideOver */}
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <TransitionChild
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              {/* Aquí sí usamos DialogPanel para el contenido */}
              <DialogPanel className="relative w-screen max-w-md bg-white shadow-xl flex flex-col overflow-y-auto">
                {/* Botón de cerrar */}
                <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4 z-10">
                  <button
                    type="button"
                    className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-0"
                    onClick={() => setOpen(false)}
                  >
                    <FontAwesomeIcon
                      className="text-lg"
                      icon={["fas", "times"]}
                    />
                  </button>
                </div>

                {/* Título */}
                <div className="px-4 sm:px-6 pt-6">
                  <DialogTitle className="text-4xl font-medium text-gray-600">
                    Filtros
                  </DialogTitle>
                </div>

                {/* Contenido */}
                <FormWrapper
                  initialValues={{}}
                  onSubmit={handleFiltering}
                  fields={fieldsFiltering}
                >
                  {(formik: any) => (
                    <>
                      <div className="mt-6 relative flex-1 px-4 sm:px-6">
                        <div className="mt-5 md:mt-0 md:col-span-2">
                          <Form fields={fieldsFiltering} />
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="p-6  bg-gray-100 rounded-md">
                        <Button
                          title="Filtrar"
                          icon="filter"
                          onClick={() => handleFiltering(formik.values)}
                          theme="primary"
                        />
                      </div>
                    </>
                  )}
                </FormWrapper>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
