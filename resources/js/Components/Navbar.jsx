import { Link } from "@inertiajs/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


const Navbar = ({ user }) => {
    return (
        <div className="navbar sticky top-0 bg-white">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl" style={{ color: "#ef33dc" }}>Cuyy <span className="text-slate-400">News</span></a>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" style={{ border: "1px solid gray", backgroundColor: "#f5f2f4" }} />
                </div>
                <div className="dropdown  dropdown-end">
                    <div tabIndex={0} role="button" className="btn flex flex-col justify-center items-center text-center btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full flex flex-col justify-center items-center text-center">
                            <FontAwesomeIcon icon={faBars} className="text-lg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        {!user ?
                            <>
                                <li><Link href={route('login')} as="button">login</Link></li>
                                <li><Link href={route('register')} as="button"> Register</Link></li>
                            </>
                            :
                            <>
                                <li>
                                    <Link className="justify-between" href={route('dashboard')} as="button">
                                        Dashboard
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><Link>Settings</Link></li>
                                <li><Link className="justify-between" href={route('logout')} method="post" as="button">Logout</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar