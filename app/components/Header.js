
import { useQuery } from '@apollo/client'; 
import { GET_USER } from '../lib/queries';

const Header = () => {
    const { data, loading } = useQuery(GET_USER);
    if(loading) return <p>Loading...</p>;
    return (
        <div className='flex justify-between mb-5'>
            {data.getUserFromToken ? 
            <>
                <p> Hello, {data?.getUserFromToken?.name} {data?.getUserFromToken?.lastName}</p>
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        location.reload(true);
                    }} 
                    className='bg-slate-700 text-white uppercase text-sm py-2 px-3 rounded hover:bg-slate-900 '
                    >
                        Sign out
                </button>
            </>
            : 
            null
            }
        </div>
    )
};

export default Header;