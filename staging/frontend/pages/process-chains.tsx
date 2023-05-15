import DashboardFrame from "@/components/Dashboard/DashboardFrame";
import Dag from "@/components/TABS/Dag";
import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment,useState} from "react";
import {ClockIcon, FingerPrintIcon, AdjustmentsHorizontalIcon, ChevronDoubleRightIcon} from "@heroicons/react/24/outline";
import {TextInput} from "@tremor/react";

export default function ProcessChains(){
    const [open, setOpen] = useState(false)

    const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(!open)
    }
    return(
        <DashboardFrame title="List(s) of Process Chains">
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            <AdjustmentsHorizontalIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Process Chain
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <div>
                                                    <TextInput icon={AdjustmentsHorizontalIcon} placeholder="Name of Process Chain" />
                                                </div>
                                                <div className="mt-3">
                                                    <TextInput icon={FingerPrintIcon} placeholder="Process Chain ID" />
                                                </div>
                                                <div className="mt-3">
                                                    <TextInput icon={ChevronDoubleRightIcon} placeholder="Path to Process Chain" />
                                                </div>
                                                <div className="mt-3">
                                                    <TextInput icon={ClockIcon} placeholder="Schedule Interval" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                            onClick={() => setOpen(false)}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <button onClick={handleBtnClick} className="px-3 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white focus:outline-none focus:bg-blue-500 focus:text-white">
                Add Process Chain
            </button>
            <Dag/>

        </DashboardFrame>
    )
}