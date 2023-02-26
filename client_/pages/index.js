import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import StaticSidebar from '../components/Sidebars/staticSidebar'

import Header from '../components/Header'
import UserManagement from '../components/userManagement'
import { updateUserList } from '../features/users/usersSlice'
import { useDispatch } from 'react-redux'
import { updateItemsList } from '../features/users/itemsSlice'
import Router from 'next/router'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
]



export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData(){
      try {
        const token = sessionStorage.getItem('token')
        const res = await fetch('http://localhost:8080/student',{ headers: {'Content-Type': 'application/json', "Authorization" : `Bearer ${token}`}})
        const data = await res.json();
        console.log('USERS: ', data)
        dispatch(updateUserList(data))
      } catch(e) {
        console.log('Unauthorized: ', e)
        Router.push('/login')
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <div>
        <StaticSidebar navigation={navigation} />
        <div className="flex flex-1 flex-col md:pl-64">
          <Header />
          <main>
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
              </div>
              <div className="mx-auto max-w-8xl px-4 sm:px-6 md:px-2">
                {/* Replace with your content */}
                <UserManagement />
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}