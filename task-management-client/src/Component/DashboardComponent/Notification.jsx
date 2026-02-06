import { Link } from 'react-router';

const Notification = ({ n, popupRef }) => {
    return (

        <Link to={n.actionRoute}>
            <div ref={popupRef} className='px-6 w-full py-3 bg-base-200 rounded-lg space-y-1 hover:bg-primary/20 hover:text-primary-content'>
                <p className='text-base-content capitalize font-medium'>{n.message}</p>
                <p className='text-xs text-base-content/50'>Time: {new Date(n.Time).toLocaleString()}</p>
            </div>
        </Link>
    );
};

export default Notification;
