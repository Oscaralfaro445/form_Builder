import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../Button/Button";

export const SlideOver = ({
  isOpen,
  setOpen,
  children,
  handleFormSubmit,
}: any) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <TransitionChild
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPanel className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <TransitionChild
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-0 focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Cerrar</span>
                      <FontAwesomeIcon
                        className="text-lg"
                        icon={["fas", "times"]}
                      />
                    </button>
                  </div>
                </TransitionChild>
                <div className="h-full flex flex-col pt-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-4xl font-medium text-gray-600">
                      Filtros
                    </DialogTitle>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    {/* Replace with your content */}
                    <div className="mt-5 md:mt-0 md:col-span-2">{children}</div>
                    {/* /End replace */}
                  </div>
                  <div className="p-6 bg-gray-100 rounded-md">
                    <Button
                      title="Filtrar"
                      icon="filter"
                      onClick={handleFormSubmit}
                      theme="primary"
                    />
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
