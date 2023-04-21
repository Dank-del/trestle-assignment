import {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {PlusIcon, ArrowRightOnRectangleIcon} from '@heroicons/react/20/solid'
import {Link} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, logout} from "../utils/firebase";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../stores/appState";
import {navModalSlice} from "../stores/postItemSlice";

// interface IUser {
//     name: string;
//     email: string;
//     imageUrl: string;
// }

const navigation = [
    {name: 'Home', href: '/', current: true},
]
const userNavigation = [
    {name: 'Your Profile', href: '/profile'},
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
    const [user] = useAuthState(auth);
    const count = useSelector((state: RootState) => state.navModal.open);
    const dispatch = useDispatch();
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({open}) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="-ml-2 mr-2 flex items-center md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button
                                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-shrink-0 items-center">
                                    <svg className="block h-8 w-auto lg:hidden" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                           strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35287C10.9563 2.88237 13.0437 2.88237 15.0496 3.35287C17.827 4.00437 19.9956 6.17301 20.6471 8.95043C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043Z"
                                                stroke="#ffffff" strokeWidth="1.5"></path>
                                            <path
                                                d="M3.35288 8.95043C2.88237 10.9563 2.88237 13.0437 3.35288 15.0496C4.00437 17.827 6.17301 19.9956 8.95044 20.6471C10.9563 21.1176 13.0437 21.1176 15.0496 20.6471C17.827 19.9956 19.9956 17.827 20.6471 15.0496C21.1176 13.0437 21.1176 10.9563 20.6471 8.95043C19.9956 6.17301 17.827 4.00437 15.0496 3.35287"
                                                stroke="#fafaff" strokeWidth="1.5" strokeLinecap="round"></path>
                                            <path
                                                d="M7.84912 8.86907C7.55622 8.57618 7.08135 8.57618 6.78846 8.86907C6.49556 9.16197 6.49556 9.63684 6.78846 9.92973L7.84912 8.86907ZM8.35906 10.4397L7.82873 10.97C7.96938 11.1107 8.16015 11.1897 8.35906 11.1897C8.55797 11.1897 8.74874 11.1107 8.88939 10.97L8.35906 10.4397ZM10.9699 8.88946C11.2628 8.59657 11.2628 8.12169 10.9699 7.8288C10.677 7.53591 10.2022 7.53591 9.90928 7.8288L10.9699 8.88946ZM13.0403 9.16954C12.6261 9.16954 12.2903 9.50533 12.2903 9.91954C12.2903 10.3338 12.6261 10.6695 13.0403 10.6695V9.16954ZM16.6812 10.6695C17.0955 10.6695 17.4312 10.3338 17.4312 9.91954C17.4312 9.50533 17.0955 9.16954 16.6812 9.16954V10.6695ZM7.84912 14.0704C7.55622 13.7775 7.08135 13.7775 6.78846 14.0704C6.49556 14.3633 6.49556 14.8382 6.78846 15.1311L7.84912 14.0704ZM8.35906 15.641L7.82873 16.1714C8.12162 16.4643 8.5965 16.4643 8.88939 16.1714L8.35906 15.641ZM10.9699 14.0908C11.2628 13.7979 11.2628 13.3231 10.9699 13.0302C10.677 12.7373 10.2022 12.7373 9.90928 13.0302L10.9699 14.0908ZM13.0403 14.3709C12.6261 14.3709 12.2903 14.7067 12.2903 15.1209C12.2903 15.5351 12.6261 15.8709 13.0403 15.8709V14.3709ZM16.6812 15.8709C17.0955 15.8709 17.4312 15.5351 17.4312 15.1209C17.4312 14.7067 17.0955 14.3709 16.6812 14.3709V15.8709ZM6.78846 9.92973L7.82873 10.97L8.88939 9.90935L7.84912 8.86907L6.78846 9.92973ZM8.88939 10.97L10.9699 8.88946L9.90928 7.8288L7.82873 9.90935L8.88939 10.97ZM13.0403 10.6695H16.6812V9.16954H13.0403V10.6695ZM6.78846 15.1311L7.82873 16.1714L8.88939 15.1107L7.84912 14.0704L6.78846 15.1311ZM8.88939 16.1714L10.9699 14.0908L9.90928 13.0302L7.82873 15.1107L8.88939 16.1714ZM13.0403 15.8709H16.6812V14.3709H13.0403V15.8709Z"
                                                fill="#ffffff"></path>
                                        </g>
                                    </svg>
                                    <svg className="hidden h-8 w-auto lg:block" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                           strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35287C10.9563 2.88237 13.0437 2.88237 15.0496 3.35287C17.827 4.00437 19.9956 6.17301 20.6471 8.95043C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043Z"
                                                stroke="#ffffff" strokeWidth="1.5"></path>
                                            <path
                                                d="M3.35288 8.95043C2.88237 10.9563 2.88237 13.0437 3.35288 15.0496C4.00437 17.827 6.17301 19.9956 8.95044 20.6471C10.9563 21.1176 13.0437 21.1176 15.0496 20.6471C17.827 19.9956 19.9956 17.827 20.6471 15.0496C21.1176 13.0437 21.1176 10.9563 20.6471 8.95043C19.9956 6.17301 17.827 4.00437 15.0496 3.35287"
                                                stroke="#fafaff" strokeWidth="1.5" strokeLinecap="round"></path>
                                            <path
                                                d="M7.84912 8.86907C7.55622 8.57618 7.08135 8.57618 6.78846 8.86907C6.49556 9.16197 6.49556 9.63684 6.78846 9.92973L7.84912 8.86907ZM8.35906 10.4397L7.82873 10.97C7.96938 11.1107 8.16015 11.1897 8.35906 11.1897C8.55797 11.1897 8.74874 11.1107 8.88939 10.97L8.35906 10.4397ZM10.9699 8.88946C11.2628 8.59657 11.2628 8.12169 10.9699 7.8288C10.677 7.53591 10.2022 7.53591 9.90928 7.8288L10.9699 8.88946ZM13.0403 9.16954C12.6261 9.16954 12.2903 9.50533 12.2903 9.91954C12.2903 10.3338 12.6261 10.6695 13.0403 10.6695V9.16954ZM16.6812 10.6695C17.0955 10.6695 17.4312 10.3338 17.4312 9.91954C17.4312 9.50533 17.0955 9.16954 16.6812 9.16954V10.6695ZM7.84912 14.0704C7.55622 13.7775 7.08135 13.7775 6.78846 14.0704C6.49556 14.3633 6.49556 14.8382 6.78846 15.1311L7.84912 14.0704ZM8.35906 15.641L7.82873 16.1714C8.12162 16.4643 8.5965 16.4643 8.88939 16.1714L8.35906 15.641ZM10.9699 14.0908C11.2628 13.7979 11.2628 13.3231 10.9699 13.0302C10.677 12.7373 10.2022 12.7373 9.90928 13.0302L10.9699 14.0908ZM13.0403 14.3709C12.6261 14.3709 12.2903 14.7067 12.2903 15.1209C12.2903 15.5351 12.6261 15.8709 13.0403 15.8709V14.3709ZM16.6812 15.8709C17.0955 15.8709 17.4312 15.5351 17.4312 15.1209C17.4312 14.7067 17.0955 14.3709 16.6812 14.3709V15.8709ZM6.78846 9.92973L7.82873 10.97L8.88939 9.90935L7.84912 8.86907L6.78846 9.92973ZM8.88939 10.97L10.9699 8.88946L9.90928 7.8288L7.82873 9.90935L8.88939 10.97ZM13.0403 10.6695H16.6812V9.16954H13.0403V10.6695ZM6.78846 15.1311L7.82873 16.1714L8.88939 15.1107L7.84912 14.0704L6.78846 15.1311ZM8.88939 16.1714L10.9699 14.0908L9.90928 13.0302L7.82873 15.1107L8.88939 16.1714ZM13.0403 15.8709H16.6812V14.3709H13.0403V15.8709Z"
                                                fill="#ffffff"></path>
                                        </g>
                                    </svg>
                                </div>
                                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'px-3 py-2 rounded-md text-sm font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center">
                                {user &&
                                    <div className="flex-shrink-0">
                                        <button
                                            onClick={() => dispatch(navModalSlice.actions.open())}
                                            type="button"
                                            className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                                            <span>New Task</span>
                                        </button>
                                    </div>
                                }
                                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        {user ? <div>
                                            <Menu.Button
                                                className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="sr-only">Open user menu</span>
                                                <img className="h-8 w-8 rounded-full" src={user.photoURL!} alt=""/>
                                            </Menu.Button>
                                        </div> : <>
                                            <div className="flex-shrink-0">
                                                <Link to="/signin"
                                                      type="button"
                                                      className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                                                >
                                                    <ArrowRightOnRectangleIcon className="-ml-1 mr-2 h-5 w-5"
                                                                               aria-hidden="true"/>
                                                    <span>Login</span>
                                                </Link>
                                            </div>
                                        </>}
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {user && userNavigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({active}) => (
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <a className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700'
                                                        )} onClick={logout}>Logout
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                        <div className="border-t border-gray-700 pt-4 pb-3">
                            {user &&
                                <div className="flex items-center px-5 sm:px-6">
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src={user.photoURL!} alt=""/>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-white">{user.displayName}</div>
                                        <div className="text-sm font-medium text-gray-400">{user.email}</div>
                                    </div>
                                </div>}
                            <div className="mt-3 space-y-1 px-2 sm:px-3">
                                {user && userNavigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                                <Disclosure.Button>
                                    <a
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                        onClick={logout}>Logout
                                    </a>
                                </Disclosure.Button>
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
