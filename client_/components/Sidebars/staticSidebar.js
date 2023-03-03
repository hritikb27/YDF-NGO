{/* Static sidebar for desktop */ }
import Router from "next/router";
import classNames from "../../utils/classNames";

const StaticSidebar = ({ navigation }) => {

    const handleLogout =() => {
        sessionStorage.removeItem('token')
        Router.push('/login')
    }

    return (
        <div className="z-50 hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-grow flex-col overflow-y-auto bg-indigo-700 pt-5 items-between">
                <div className="flex flex-shrink-0 items-center px-4">
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                        alt="Your Company"
                    />
                </div>
                <div className="mt-5 flex flex-1 flex-col">
                    <nav className="flex-1 space-y-1 px-2 pb-4">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600',
                                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                )}
                            >
                                <item.icon className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300" aria-hidden="true" />
                                {item.name}
                            </a>
                        ))}
                    </nav>
                </div>
            <div>
                <button onClick={handleLogout} className={
                    'w-[50%] mx-auto bg-indigo-800 text-white text-indigo-100 hover:bg-indigo-600 group flex justify-center items-center px-2 py-2 mb-4 text-sm font-medium rounded-md'
                }>Logout</button>
            </div>
            </div>

        </div>
    )
}

export default StaticSidebar;