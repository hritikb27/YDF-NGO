import { Fragment, useReducer, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { addUser } from '../../features/users/usersSlice';
import { useDispatch } from 'react-redux';

const initialState = { ydfID: '', name: '', gender: '' };

function reducer(state, action) {
  switch (action.type) {
    case 'ydfID':
      return { ...state, ydfID: action.payload };
    case 'name':
      return { ...state, name: action.payload };
    case 'gender':
      return { ...state, gender: action.payload };
    default:
      throw new Error();
  }
}

const AddUser = ({ openModal, setOpenModal }) => {
    const dispatch = useDispatch()
    const [state, dispatchInput] = useReducer(reducer, initialState)
    const cancelButtonRef = useRef(null)

    const handleAddUser = async () => {
        const token = sessionStorage.getItem('token')
        console.log('toke: ', token)
        const res = await fetch('https://yogdhyaan-ngo.onrender.com/student/add', {method:'post', headers: {'Content-Type': 'application/json', "Authorization" : `Bearer ${token}`}, body:JSON.stringify({"ydfID": state.ydfID, "Name": state.name, "gender": state.gender })})
        dispatch(addUser({ name: state.name, ydfID: state.ydfID, gender: state.gender }))
        setOpenModal(false)
    }

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
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                            Add User
                                        </Dialog.Title>
                                        <form className="space-y-6 flex flex-col items-center" action="#" method="POST">
                                            <div className='w-[70%]'>
                                                <label htmlFor="id" className="block text-start text-sm font-medium text-gray-700">
                                                    ID
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        value={state.ydfID}
                                                        onChange={(e) => dispatchInput({ type: 'ydfID', payload: e.target.value })}
                                                        type="text"
                                                        required
                                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className='w-[70%]'>
                                                <label htmlFor="name" className="block text-start text-sm font-medium text-gray-700">
                                                    Name
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        value={state.name}
                                                        onChange={(e) => dispatchInput({ type: 'name', payload: e.target.value })}
                                                        type="text"
                                                        required
                                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className='w-[70%]'>
                                                <label htmlFor="name" className="block text-start text-sm font-medium text-gray-700">
                                                    Gender
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        value={state.gender}
                                                        onChange={(e) => dispatchInput({ type: 'gender', payload: e.target.value })}
                                                        type="text"
                                                        required
                                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:px-2 gap-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                        onClick={handleAddUser}
                                    >
                                        Add User
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
export default AddUser;