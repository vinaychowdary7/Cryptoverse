import React, { useContext, useState } from 'react';
import {SiEthereum} from 'react-icons/si'
import {BsInfoCircle} from 'react-icons/bs'
import { TransactionContext, TransactionProvider } from '../context/TransactionContext';
import { shortenAddress } from '../utils/shortenAddress';
import { ToastContainer } from 'react-toastify';
import Loader from './Loader';


const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white"; 

const Input = ({placeholder,name,type,value,handleChange}) =>{
  return (
  <input 
    placeholder={placeholder}
    type={type}
    step="0.00001"
    value={value}
    onChange={(e)=>handleChange(e,name)}
    className='my-2 w-full rounded-sm p-2 bg-transparent text-white border-1 border-gray-700 text-sm '
  />)
}

const Transfer = () => {

  const {connectWallet,currentAccount,formData,handleChange,sendTransaction,isLoading} = useContext (TransactionContext);
  const [formKey,setFormKey]=useState(0);

  const handleSubmit = (e) =>{
    const {addressTo,amount,keyword,message}=formData;
    e.preventDefault();
    if(!addressTo||!amount||!keyword||!message)return ;

    sendTransaction();
    setFormKey((prev)=>prev+1);
    
  }
  return (
    <div className='flex w-full justify-center items-center'>
      <ToastContainer/>
      <div className='flex min-[990px]:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
        <div className='flex flex-1 justify-start flex-col min-[990px]:mr-10'>
          <h1 className='text-3xl sm:5xl text-white py-1'>Send Crypto <br/> across the world</h1>
          <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
          Explore cryptocurrency with Cryptoverse - discover  Currencies, Exchanges and Market trends
          </p>
          {!currentAccount&&
          <button type='button' onClick={connectWallet} className='flex flex-row justify-center items-center my-5 bg-blue-600 p-3 rounded-full cursor-pointer hover:bg-blue-900'>
            <p className='text-white text-base font-semibold'>Connect Wallet</p>
          </button>
          }
          <div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-10'>
            <div className={`rounded-tl-2xl ${commonStyles}`}>
              Reliability
            </div>
            <div className={commonStyles}>
              Security
            </div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>
              Ethereum
            </div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>
              Web 3.0
            </div>
            <div className= {commonStyles}>
              Low fees
            </div>
            <div className={`rounded-br-2xl ${commonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 items-center justify-start w-full min-[990px]:mt-0 mt-10'>
          <div className='p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism'>
            <div className='flex justify-between flex-col w-full h-full'>
              <div className='flex justify-between items-start'>
                <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                  <SiEthereum fontSize={21} color='#fff'/>
                </div>
                <BsInfoCircle fontSize={17} color='#fff'/>
              </div>
              <div>
                <p className='text-white font-light text-sm'>
                  {shortenAddress(currentAccount)}
                </p>
                <p className='text-white font-bold text-lg mt-1'>
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className='p-5 sm:w-96 h-78 w-full flex flex-col justify-start items-center blue-glassmorphism' key={formKey}>
            <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange}/>
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange}/>
            <Input placeholder="Name" name="keyword" type="text" handleChange={handleChange}/>
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange}/>

            <div className='h-[1px] w-full bg-gray-400 my-2'>
              {isLoading?(<Loader/>):
              (<button type="button" onClick={handleSubmit} className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer'>
                Send Now
              </button>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
