import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useTokenVerification = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const verifyToken = async () => {
        const token = localStorage.getItem('userData');

        if (!token) {
            console.log("no token");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/auth/access', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setVerificationResult(response.data); 
            setIsVerified(true);
        } catch (error) {
            console.error('Token verification failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);

    // Redirect only when verification is complete
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoading && !isVerified) {
            navigate('/login');
        }
    }, [isLoading, isVerified, navigate]);

    return { isVerified, verificationResult };
};

export default useTokenVerification;
