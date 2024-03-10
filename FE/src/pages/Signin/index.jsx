import { useState } from 'react';
import { Layout } from '../../components';
import { login } from '../../apis';
import { Link  } from 'react-router-dom';

export const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            if (response.status === 200) {
                console.log('Login successful');
                localStorage.setItem('password', password);
                localStorage.setItem('email', email);
                setIsLoggedIn(true);
                
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign in</h2>
                {isLoggedIn ? (
                    <div className='text-center '>
                    <p>Login successful. Redirecting to home page...</p>
                    <Link to="/" className='text-2xl text-lime-500'>Home</Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                            <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                            <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-500" />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">Sign in</button>
                    </form>
                )}
            </div>
        </Layout>
    );
};
