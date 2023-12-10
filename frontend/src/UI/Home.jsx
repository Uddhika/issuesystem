import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import axios from 'axios';
import Modal from 'react-modal';
import PieChart from '../components/PieChart';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('body');

const Home = () => {

  const [search, setsearch] = useState('');

  const[subject, setSubject] = useState('');
  const[desc, setDesc] = useState('');
  const[issueType, setIssueType] = useState('');
  const[issueStatus, setIssueStatus] = useState('');

  const[issueTableData, setIssueTableData] = useState([]);
  const[filterdata, setfilterdata] = useState([]);
  const[filterpiedata, setfilterpiedata] = useState([]);

  const[deleteissue ,setdeleteissue] = useState('');
  const[updateissue, setupdateissue] = useState([]);

  const [modalupdate, setmodalupdate] = useState(false);
  const [modaldelete, setmodaldelete] = useState(false);

  function updateIssueStatus(e){
    e.preventDefault();
    // console.log(updateissue);
    const id = updateissue.id;
    const currentdate = new Date();
    const dateonly = currentdate.toLocaleDateString();

    const upIssue={
      issueDate: dateonly,
      issueDescription: updateissue.issueDescription,
      issueName: updateissue.issueName,
      issueStatus: issueStatus,
      issueType: updateissue.issueType
    }
    axios.put(`http://localhost:8080/api/v1/issue/${id}`,upIssue).then(response => {
      // console.log(response);
      getIssueData();
      getPieData();
    })
    setmodalupdate(false);
  }

  async function setFilterIssueData(id){
    
    let filterrecords = [];

    await axios.get("http://localhost:8080/api/v1/allissues").then(response => {
      // console.log(response.data);
      
      const res = response.data;
      filterrecords = res.filter((record) => record.id === id);
      // console.log(filterrecords);
      setfilterdata(filterrecords);
    })

  }

  async function addIssue(e){

    e.preventDefault();

    if(desc != '' && subject!= '' && issueType!=''){
      const currentdate = new Date();
      const dateonly = currentdate.toLocaleDateString();
  
      const addIssue={
        issueDate: dateonly,
        issueDescription: desc,
        issueName: subject,
        issueStatus: "Open",
        issueType: issueType
      }
  
      await axios.post("http://localhost:8080/api/v1/issue", addIssue).then(response => {
        // console.log(response);
        getIssueData();
        getPieData();
      })
    }

    else{
      alert('Please fill all the fields')
    }

  }

  async function getIssueData(){
    await axios.get("http://localhost:8080/api/v1/issue").then(response => {
      // console.log(response.data);
      setIssueTableData(response.data);
    })
  }

  function deleteIssue(){
    axios.delete(`http://localhost:8080/api/v1/issue/${deleteissue}`).then(response => {
      // console.log(response);
      getIssueData();
      getPieData();
    })
    setmodaldelete(false);
  }

  function getPieData(){
    axios.get("http://localhost:8080/api/v1/issue").then(response => {
      // console.log(response.data);
      
      let openstat = 0;
      let inprostat = 0;
      let waitstat = 0;
      let solvstat = 0;

      const res = response.data;
      for(let i=0; i<res.length; i++){
        // console.log(res[i].issueStatus);
        if(res[i].issueStatus == "Open"){
          openstat+=1;
        }
        else if(res[i].issueStatus == "In-Progress"){
          inprostat+=1;
        }
        else if(res[i].issueStatus == "Waiting On Client"){
          waitstat+=1;
        }
        else if(res[i].issueStatus == "Resolved"){
          solvstat+=1;
        }
      }

      const piedat = {
        open: openstat,
        progress: inprostat,
        wait: waitstat,
        solve: solvstat
      };

      // console.log(piedat);
      setfilterpiedata(piedat);     

    })
  }
  
  useEffect(() => {
    getIssueData();
    getPieData();
  },[]);
  
  return (
    <div>

      <div>
        <Modal
          isOpen={modalupdate}
          // onAfterOpen={afterOpenModal}
          onRequestClose={() => { setmodalupdate(false) }}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className='flex justify-end'>
            <button onClick={() => { setmodalupdate(false) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
          <div className='mt-4'>
            <div>
              <table className='table-auto sm:w-full'>
                <thead>
                  <tr className='bg-slate-600 text-white'>
                    <th className='font-light'>Date</th>
                    <th className='font-light'>Issue Status</th>
                  </tr>
                </thead>
                { filterdata.map((item, index) => (
                <tbody key={item.statusid}>
                  <tr>
                    <td>{item.idate}</td>
                    <td>{item.issuestatus}</td>
                  </tr>
                </tbody>
                ))
              }
              </table>
            </div>
            <select className='mt-3 rounded-md w-full border border-slate-300 p-1.5 font-light text-sm' onChange={(e) => setIssueStatus(e.target.value)}>
                  <option value="">Change Issue Status</option>
                  <option value="Open">Open</option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Waiting On Client">Waiting On Client</option>
                  <option value="Resolved">Resolved</option>
              </select>

            <button
              type="submit"
              className="mt-4 flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-normal leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={updateIssueStatus}
            >
              Change
            </button>
          </div>
        </Modal>
      </div>

      <div>
        <Modal
          isOpen={modaldelete}
          // onAfterOpen={afterOpenModal}
          onRequestClose={() => { setmodaldelete(false) }}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className='flex justify-end'>
            <button onClick={() => { setmodaldelete(false) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
          <div className='mt-4'>
            
            <p>Are you sure want to delete?</p>

            <div className='flex gap-3'>
              <button
                type="submit"
                className="mt-4 flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-normal leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={deleteIssue}
              >
                Yes
              </button>
              <button
                type="submit"
                className="mt-4 flex w-full justify-center rounded-md bg-slate-500 px-3 py-1.5 text-sm font-normal leading-6 text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {setmodaldelete(false)}}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      </div>

        <div className='mx-auto w-3/4 my-10'>
            <h1 className='font-light text-3xl text-center'>Customer Issue Reporting System</h1>
        </div>

        <div className="mx-auto sm:max-w-5xl">
        <div className='flex'>
          <div className="mb-10 sm:max-w-sm flex-grow">
            <form className="space-y-6" action="#" method="POST" id="demo_form">
              
            <div className="sm:col-span-3 ">
              <label htmlFor="first-name" className="text-left block text-sm font-normal leading-6 text-gray-900">
                Subject
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="issue-name"
                  id="issue-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 ps-3 font-light text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Ex:- Network Issue"
                  onChange={(e) => {setSubject(e.target.value)}}
                />
              </div>
            </div>

            <select className='rounded-md w-full border border-slate-300 p-1.5 font-light text-sm' onChange={(e) => setIssueType(e.target.value)}>
                <option value="">Select Issue Type</option>
                <option value="Bug">Bug</option>
                <option value="Question">Question</option>
                <option value="Improvement">Improvement</option>
            </select>

            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="text-left block text-sm font-normal leading-6 text-gray-900">
                Issue Description
              </label>
              <div className="mt-2">
                <textarea
                  type="text"
                  name="issue-description"
                  id="issue-desc"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 ps-3 font-light text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Ex:- More Details about the Issue"
                  onChange={(e) => {setDesc(e.target.value)}}
                />
              </div>
            </div>
  
            <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-normal leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={addIssue}
                >
                  Submit
                </button>
                
            </div>
            </form>
  
          </div>
          
            <div className='flex-grow flex justify-end'>
              <div className='w-1/2'>
                <PieChart data={filterpiedata}/>
              </div>
            </div>
        </div>

        </div>

        <div className='mx-auto sm:max-w-5xl'>
          
            <div className="mb-5">
                <input
                  type="text"
                  name="issue-search"
                  id="issue-search"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 ps-3 font-light text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Type Issue Name to Search"
                  onChange={(e) => {setsearch(e.target.value)}}
                />
            </div>
          
        <table className="table-auto sm:w-full">
        <thead className=''>
          <tr className='bg-slate-600 text-white text-center'>
            <th className='font-light py-1'>ID</th>
            <th className='font-light text-left'>Date</th>
            <th className='font-light text-left'>Name</th>
            <th className='font-light text-left'>Description</th>
            <th className='font-light'>Status</th>
            <th className='font-light'>Type</th>
            <th></th>
          </tr>
        </thead>
        { issueTableData.filter((item) => {
          return search.toLowerCase() === ''
          ? item : item.issueName.toLowerCase().includes(search);
        }).map((item, index) => (
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
                <td className=''>
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
                </td>
            </tr>
        </tbody>
        ))
        }
        </table>
        </div>
        <Footer />
    </div>
  )
}

export default Home