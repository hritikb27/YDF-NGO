import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddUser from '../Modals/addUser';
import DetailsModal from '../Modals/Details';
import Pagination from '../Pagination';
import UserRow from './userRow';


let PageSize = 10;

const UserManagement = () => {
  const dispatch = useDispatch()
  const usersList = useSelector(state => state.users.users)
  const items = useRef()
  const itemsList = useSelector(state => state.items.items)
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [Strip, setStrip] = useState(false)
  const [Syringe, setSyringe] = useState(false)
  const [Insulin, setInsulin] = useState(false)
  const currentID = useRef()
  const currentUser = useRef()
  const [details, setDetails] = useState()
  const [editable, setEditable] = useState(false)

  useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    setCurrentItems(usersList.slice(firstPageIndex, lastPageIndex))
    return usersList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, usersList]);

  const handleChange = (query) => {
    const filteredResults = usersList.filter(item => item.name.includes(query))
    setCurrentItems(filteredResults)
  }

  useEffect(() => {
    items.current = itemsList
  }, [itemsList])

  return (
    <div className="mt-8 w-full flex flex-col gap-4">
      <div className="sm:flex sm:justify-between">
        <div className="w-full max-w-lg lg:max-w-xs">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative text-gray-400 focus-within:text-gray-600">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="search"
              className="block w-full rounded-md border border-black bg-white py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:text-sm"
              placeholder="Search"
              type="search"
              name="search"
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            onClick={() => setOpenModal(true)}
          >
            Add user
          </button>
        </div>
      </div>
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    ID
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Notes
                  </th>
                  <th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Address
                  </th>
                  <th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
                    DOB
                  </th>
                  <th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Gender
                  </th>
                  <th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Dr. & Hospital
                  </th>
                  <th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
                    HBA1C
                  </th>
                  <th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Insulin
                  </th>
                  <th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Strips
                  </th>
                  <th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Syringe/Pen Needle
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {currentItems && currentItems.map((person) => {
                  return <UserRow items={items} person={person} currentID={currentID} currentUser={currentUser} setDetails={setDetails} setOpenPopup={setOpenPopup} />
                })}
              </tbody>
            </table>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={usersList.length}
              pageSize={PageSize}
              onPageChange={page => setCurrentPage(page)}
            />
          </div>
          <AddUser openModal={openModal} setOpenModal={setOpenModal} />
          <DetailsModal openModal={openPopup} setOpenModal={setOpenPopup} details={details} ydfID={currentID.current} currentUser={currentUser.current} />
          {/* <DetailsModal openModal={Insulin} setOpenModal={setInsulin} />
          <DetailsModal openModal={Strip} setOpenModal={setStrip} />
          <DetailsModal openModal={Syringe} setOpenModal={setSyringe} /> */}
        </div>
      </div>
    </div>
  )
}

export default UserManagement;