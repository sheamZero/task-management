import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router';
import useAuth from '../Hook/useAuth';
import Loading from '../Shared/Loading';
import Footer from '../Shared/Footer';

const HomeLayout = () => {

    const { loading } = useAuth()


    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <div className='bg-primary text-primary-content sticky top-0 z-50'>
                <Navbar />
            </div>
            <div className='min-h-screen'>
                <Outlet />
            </div>

            <div className='bg-base-300'>
                <Footer />
            </div>
        </div>
    );
};

export default HomeLayout;