import { Head, Link } from '@inertiajs/react';
import '../../../public/css/style.css'
import React, { useState } from 'react'
import Logo from '../../../public/images/360_F_475009987_zwsk4c77x3cTpcI3W1C1LU4pOSyPKaqi (1).jpg'
import { faList, faGear, faHouse, faNewspaper, faUserSecret, faUser, faAngleDown, faAngleRight, faSatelliteDish, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AuthenticatedAdmin({ admin, children }) {


    const [showDropdown, setShowDropdown] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const routes = [
        { name: 'Dashboard', link: '/admin' },
        { name: 'Admin', link: '/data-admin' },
        { name: 'User', link: '/data-user' },
        { name: 'Panding News', link: '/panding-news' },
        { name: 'News Controller', link: '/newscontroller' },
        { name: 'News Insert', link: '/insert-news' },
        { name: 'Settings', link: '/settings' }
    ];

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const filteredRoutes = routes.filter(route =>
        route.name.toLowerCase().includes(searchValue.toLowerCase())
    )

    return (
        <>
            <div className="mother w-full h-full">
                {/* sidebar */}
                <div className={`sidebar ad ${showSidebar ? 'active' : ''}`}>
                    <div className="card-sidebar">
                        {/* header sidebar*/}
                        <div className="card-fto">
                            <div className="foto">
                                <img src={Logo} alt="logo" />
                            </div>
                            {admin.name}
                            <br />
                            {admin.email}
                        </div>
                        {/* end header sidebar */}
                        <div className="search">
                            <div className="box-search flex flex-col">
                                <input
                                    type="search"
                                    name="search"
                                    id="search"
                                    value={searchValue}
                                    onChange={handleChange}
                                    placeholder='Search route...' />
                                {searchValue && (
                                    filteredRoutes.map(route => (
                                        <div className="hasil" key={route.link}>
                                            <Link href={route.link}>
                                                {route.name}
                                                <br />
                                                <p>{route.link}</p>
                                            </Link>
                                        </div>
                                    ))
                                )}
                                {!filteredRoutes.length && (
                                    <div className='hasil'>Not Found...</div>
                                )}
                            </div>
                        </div>
                        <div className="hero-bar">
                            <ul className="route">
                                <FontAwesomeIcon icon={faHouse} style={{ fontSize: "21px" }} />
                                <li >
                                    <Link href={route('admin.dashboard')}>Dashboard</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="navigasi">
                            <ul className='route-nav'>
                                <li className="nav on" onClick={() => setShowDropdown(!showDropdown)} >
                                    <p>Auth</p>
                                    <FontAwesomeIcon icon={showDropdown ? faAngleDown : faAngleRight} />
                                </li>
                                {showDropdown && (
                                    <ul className='drop-nav'>
                                        <Link className='li' href={route('data.admin')}>
                                            <FontAwesomeIcon icon={faUserSecret} />
                                            Admin
                                        </Link>
                                        <Link className='li' href={route('data.user')}>
                                            <FontAwesomeIcon icon={faUser} />
                                            User
                                        </Link>
                                    </ul>
                                )}

                                <div className='text-start w-full mt-3' style={{ fontWeight: "400", fontFamily: "Ubuntu, sans-serif" }}>News</div>
                                <Link className="nav" href={route('pending.news')}>
                                    <FontAwesomeIcon icon={faNewspaper} className='icons' />
                                    <p>Panding News </p>
                                </Link>
                                <Link href={route('news.control')} className="nav" style={{ marginTop: "7px" }}>
                                    <FontAwesomeIcon icon={faSatelliteDish} className='icons' />
                                    <p>News Controller </p>
                                </Link>
                                <Link href={route('news.insert')} className="nav" style={{ marginTop: "7px" }}>
                                    <FontAwesomeIcon icon={faArrowUpFromBracket} className='icons' />
                                    <p>News Insert</p>
                                </Link>
                                <div className='text-start w-full mt-3' style={{ fontWeight: "400", fontFamily: "Ubuntu, sans-serif" }}>Account</div>
                                <Link href={route('settings')} className="nav" style={{ marginTop: "4px" }}>
                                    <FontAwesomeIcon icon={faGear} className='icons' />
                                    <p>Settings</p>
                                </Link>
                            </ul>

                        </div>
                    </div>
                    <div className={`box-icont ${!showSidebar ? 'hidden' : ''}`} onClick={() => setShowSidebar(!showSidebar)}>
                        <FontAwesomeIcon icon={faList} />
                    </div>
                </div>


                {/* end sidebar */}
                <div className={`content ${showSidebar ? 'active' : ''} bg-gray-200`}>
                    <div className="cont">
                        <div className="icon">
                            <div className={`box-icon ${showSidebar ? 'hidden' : ''}`} onClick={() => setShowSidebar(!showSidebar)}>
                                <FontAwesomeIcon icon={faList} />
                            </div>

                            <div className={`logo-sos ${showSidebar ? 're' : ''}`}>
                                <div className="box-logo">
                                    <FontAwesomeIcon icon={faGithub} />
                                    <FontAwesomeIcon icon={faInstagram} />
                                </div>
                            </div>
                        </div>

                        <div className="box-content">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}