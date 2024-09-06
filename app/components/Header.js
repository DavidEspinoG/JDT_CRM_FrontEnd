"use client";
import { gql, useQuery } from '@apollo/client'; 
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
const Header = () => {
    const router = useRouter();
    const GET_USER = gql`
        query getUser {
            getUserFromToken {
                name
                lastName
                email
            }
        }
    `;
    
    const { data, loading, error } = useQuery(GET_USER);
    if(loading) return <p>Loading...</p>;
    if(!data.getUserFromToken) return router.push('./login');

    return (
        <div className='flex justify-between mb-5'>
            {data.getUserFromToken ? 
            <>
                <p> Hello, {data?.getUserFromToken?.name} {data?.getUserFromToken?.lastName}</p>
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        router.push('/login')
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