import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import '../../../public/css/style.css'
import Logo from '../../../public/images/logo-portal.png'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faGear, faHouse, faNewspaper, faUserSecret, faUser, faAngleDown, faAngleRight, faSatelliteDish, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';



const TransisiHalaman = ({ children }) => {
    const [previousPath, setPreviousPath] = useState(null);
    const location = useLocation();


    useEffect(() => {
        if (previousPath !== location.pathname) {
            setPreviousPath(location.pathname);
        }
    }, [location, previousPath]);

    return (
        <TransitionGroup>
            <CSSTransition key={previousPath} classNames="transisi" timeout={500}>
                <div className="page">{children}</div>
            </CSSTransition>
        </TransitionGroup>
    );
};

TransisiHalaman.propTypes = {
    children: PropTypes.node.isRequired
};

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
            setShowSidebar(window.innerWidth > 769);
        }
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);




    return (
        <div className=" bg-gray-100 lord">
            {/* sidebar */}
            <div className={`sidebar usr bg-white ${showSidebar ? 'muncul' : 'hidden'}`}>
                <div className="box-sidebar">
                    <div className="image">
                        <img src={Logo} alt="" />
                    </div>
                    <ul className="box-link">
                        <li style={{ borderTop: "1.5px solid gray", borderBottom: "1.5px solid gray" }}>
                            <Link href={route('dashboard')} className='route'>
                                <FontAwesomeIcon icon={faHouse} style={{ fontSize: "21px" }} />
                                Dashboard
                            </Link>
                        </li>
                        <li style={{ marginTop: "25px" }}>
                            <Link href={route('formnews')} className='route'>
                                <FontAwesomeIcon icon={faArrowUpFromBracket} style={{ fontSize: "21px" }} />
                                Update Berita
                            </Link>
                        </li>
                        <li>
                            <Link href={route('mynews')} className='route'>
                                <FontAwesomeIcon icon={faNewspaper} style={{ fontSize: "21px" }} />
                                Berita Saya
                            </Link>
                        </li>
                        <li>
                            <Link href={route('profile.edit')} className='route' >
                                <FontAwesomeIcon icon={faGear} style={{ fontSize: "21px" }} />
                                Settings
                            </Link>
                        </li>
                    </ul>
                    <div className={`icon-usr`} onClick={() => setShowSidebar(!showSidebar)}>
                        <FontAwesomeIcon icon={faList} />
                    </div>
                </div>
            </div>
            {/* end sidebar */}

            {/* side content */}
            <div className={`sidecontent ${!showSidebar ? 'full' : ''}`}>
                <nav className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex" style={{ width: "20%" }}>
                                <div className={`icon-us ${showSidebar && windowWidth > 640 ? 'none' : ''}`} onClick={() => setShowSidebar(!showSidebar)}>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </div>
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                        Dashboard
                                    </NavLink>
                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ms-6">
                                <div className="ms-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4 border-b-1 border-gray-400">
                                <div className="font-medium text-base text-gray-800">{user.name}</div>
                                <div className="font-medium text-sm text-gray-500">{user.email}</div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('dashboard')}>Dashboard</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('formnews')}>Update Berita</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('mynews')}>Berita saya</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                <main>
                    <TransisiHalaman>
                        {children}
                    </TransisiHalaman>
                </main>

            </div>
            {/* end side content */}
        </div >
    );
}
