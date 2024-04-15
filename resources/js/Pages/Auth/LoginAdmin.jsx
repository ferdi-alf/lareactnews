import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons';
import '../../../../public/css/style.css';
import { Inertia } from '@inertiajs/inertia';

export default function AdminLogin(props) {
    console.log("login: ", props)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        const newValue = name === 'remember' ? checked : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/loginadmin', formData);
        console.log(formData);
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container-fluid">
            <div className="container flex flex-col">
                {Object.keys(props.errors).length > 0 && (
                    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 mb-5'>
                        <div role="alert" className="alert alert-warning">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 mr-5" fill="none" viewBox="0 0 23 23">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <ul>
                                {Object.values(props.errors).map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                <div className="card">

                    <h3 className="text-center" style={{ color: 'white' }}>Login Admin</h3>
                    <div className="var">
                        <FontAwesomeIcon icon={faKey} className="icon text-center" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3" width="100%">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <label htmlFor="name"><i className="fa-solid fa-user" style={{ marginRight: '5px' }}></i>Email</label>
                        </div>
                        <div className="mb-3 password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <label htmlFor="password"><i className="fa-solid fa-lock" style={{ marginRight: '5px' }}></i>Password</label>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="toggle-password" onClick={togglePassword} />
                        </div>
                        <label className="flex items-start w-full">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={formData.remember}
                                onChange={handleChange}
                                className="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 "
                            />
                            <span className="text-sm ml-2 text-white">Remember me</span>
                        </label>
                        <button type="submit" name="submit" id="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
