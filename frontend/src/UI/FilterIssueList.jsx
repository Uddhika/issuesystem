import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FilterIssueList = () => {

    const location = useLocation();

    const issuelist = location.state.filterrecords;

    const path = useNavigate();
  return (
    <div>
        <div className='mx-auto sm:max-w-5xl my-10'>
            <div className='flex'>
                <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-6 h-6 cursor-pointer" onClick={() => {path('/')}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                </div>
                <h1 className='font-light text-3xl text-center flex-grow'>{issuelist[0].issueStatus} Issues</h1>
            </div>
        </div>
        {/* <p>{console.log(location.state.filterrecords)}</p> */}
        <div className='mx-auto sm:max-w-5xl'>
        <table className='table-auto sm:w-full'>
        <thead>
            <tr className='bg-slate-600 text-white text-center'>
            <th className='font-light py-1 text-left'>ID</th>
            <th className='font-light text-left'>Date</th>
            <th className='font-light text-left'>Name</th>
            <th className='font-light text-left'>Description</th>
            <th className='font-light'>Status</th>
            <th className='font-light'>Type</th>
            <th></th>
            </tr>
        </thead>
        { issuelist.map((item, index) => (
        <tbody key={item.id}>
            <tr className='text-left border-b'>
                <td className='py-4'>{item.id}</td>
                <td>{item.issueDate}</td>
                <td>{item.issueName}</td>
                <td>{item.issueDescription}</td>
                <td>
                  <p className='bg-green-200 py-2 rounded-md text-center text-sm'>
                    {item.issueStatus}
                  </p>
                </td>
                <td>
                  <p className='bg-red-300 py-2 rounded-md text-center text-sm'>
                    {item.issueType}
                  </p>
                </td>
                {/* <td className=''>
                  <div className='flex justify-evenly'>
                  <button className='cursor-pointer' onClick={() => {setmodalupdate(true); setupdateissue(item); setFilterIssueData(item.id);}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="grey" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                  </button>
                  <button className='cursor-pointer' onClick={() => {setmodaldelete(true); setdeleteissue(item.id);}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                  </div>
                </td> */}
            </tr>
        </tbody>
        ))
        }
        </table>
        </div>
    </div>
  )
}

export default FilterIssueList