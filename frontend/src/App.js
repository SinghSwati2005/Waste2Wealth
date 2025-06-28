import { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common'; // Contains current_user endpoint config
import { setUserDetails } from './store/userSlice';
import Context from './context';
import { CartProvider } from './context/CartContext';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [chatbotVisible, setChatbotVisible] = useState(false);
  
  // Fetch user info using HttpOnly cookie
  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include', // 👈 Important: include cookie
      });

      const data = await response.json();
      console.log('Fetched user data:', data);

      if (data.success) {
        dispatch(setUserDetails(data.data));
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('User fetch error:', err);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userDetails'));
    if (user) {
      console.log('User Role from LocalStorage:', user.role);
    }
  }, []);
  if (loading) {
    return <div className="flex items-center justify-center h-screen text-lg">Loading...</div>;
  }

  return (
    <Context.Provider value={{}}>
      <CartProvider>
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <button
          onClick={() => setChatbotVisible(!chatbotVisible)}
          className="fixed bottom-50 right-10 z-50 p-4 bg-blue-500 text-white rounded-full shadow-lg"
        >
          {chatbotVisible ? 'Close Chatbot' : 'Open Chatbot'}
        </button>

        {/* Chatbot iframe with close button */}
        {chatbotVisible && (
          <div
            className="fixed bottom-4 right-4 w-[350px] h-[500px] bg-white shadow-lg rounded-lg overflow-hidden z-50"
            style={{ borderRadius: '15px', position: 'relative' }}
          >
            {/* Close Button */}
            <button
              onClick={() => setChatbotVisible(false)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
            >
              X
            </button>

            <iframe
              src="https://7795-45-64-237-226.ngrok-free.app/"
              title="Chatbot"
              className="w-full h-full border-none"
              style={{
                pointerEvents: 'auto',
                borderRadius: '15px',
                overflow: 'hidden', // Prevents scrollbars
              }}
            ></iframe>
          </div>
        )}
        <Footer />
      </CartProvider>
    </Context.Provider>
  );
}

export default App;
