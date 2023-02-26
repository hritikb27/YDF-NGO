import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { CheckIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/users/usersSlice";
import moment from 'moment';

const DetailsModal = ({ openModal, setOpenModal, details, ydfID, currentUser }) => {
    const cancelButtonRef = useRef(null)
    const itemsList = useSelector(state => state.items.items)
    const [date, setDate] = useState();
    const [value, setValue] = useState();
    const [type, setType] = useState();
    const [editable, setEditable] = useState(false)
    const [data, setData] = useState()
    const dispatch = useDispatch()
    const usersList = useSelector(state => state.users.users)

    const handleAddEntry = async () => {
        const user = {...currentUser};
        user[details.key] = {
            ...user[details.key],
            date: value
        }

        const res = await fetch('http://localhost:8080/student/items', {method:'post', headers: {'Content-Type': 'application/json'}, body:JSON.stringify({ ydfID, 'type': details.key, data: { value: details.key === 'hba1c' ? parseFloat(value) : parseInt(value), date } })})
        dispatch(updateUser(user))
        setOpenModal(false)
    }

    const handleEdit = async (value) => {
        setEditable(prev=>!prev)
        if(!editable){
            return
        }
        const res = await fetch('http://localhost:8080/student/types', {method:'put', headers: {'Content-Type': 'application/json'}, body:JSON.stringify({ ydfID, 'type': details.key, data: type })})
        setEditable(prev=>!prev)
    }
    useEffect(() =>{
        if(details){
            const type = `${details.key}Type`
            console.log('TYPE: ', type, details)
            setType(currentUser[type])
        }
    },[currentUser, details])

    return (
        <Transition.Root show={openModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenModal}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    {details && details.key !== 'hba1c' && <div className="w-full flex justify-center items-center gap-1"><lable>{details.key.toUpperCase()} Type:</lable>
                                    <input disabled={!editable} className="w-auto text-center my-4 mx-auto" value={type} onChange={(e)=>setType(e.target.value)} />
                                    <button onClick={(e) => handleEdit(e.target.value)} className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm">
                                        {editable ? 'SAVE' : "EDIT"}
                                    </button></div>}
                                    <div className="flex flex-col">
                                        {details && details.data && details.data.map(item => {
                                            return <div className="flex gap-3 justify-center max-h-[400px] overflow-y-auto ">
                                                <span>{moment(item.date).format('ll')}: </span>
                                                <span>{item.value}</span>
                                            </div>
                                        })}
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                            {/* {(details && currentUser[details.key] !== undefined )? Object.keys(currentUser[details.key]).map(val => currentUser[details.key][val]) : ''} */}
                                        </Dialog.Title>
                                        <form className="space-y-6 flex flex-col items-center" action="#" method="POST">
                                            <input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
                                            <input type='number' value={value} onChange={(e) => setValue(e.target.value)} />
                                        </form>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:px-2 gap-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                        onClick={handleAddEntry}
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                        onClick={() => setOpenModal(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default DetailsModal;