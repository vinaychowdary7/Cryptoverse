import React, { useState, useEffect } from 'react';
import { BrowserProvider, Contract, parseEther } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const TransactionContext = React.createContext();

const getEthereumContract = async () => {
    if (!window.ethereum) {
        console.error("Ethereum object not found. Install MetaMask.");
        return null;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const transactionContract = new Contract(contractAddress, contractABI, signer);

    return transactionContract;
};

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [formData, setFormData] = useState({
        addressTo: '',
        amount: '',
        keyword: '',
        message: ''
    });
    const [isLoading,setIsLoading]=useState(false);

    const handleChange = (e, name) => {
        setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!window.ethereum) return alert("Please install MetaMask.");
    
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                setCurrentAccount(null);
                console.log("No accounts found.");
            }
    
            window.ethereum.on("accountsChanged", (newAccounts) => {
                if (newAccounts.length) {
                    setCurrentAccount(newAccounts[0]);  
                } else {
                    setCurrentAccount(null);
                }
            });
    
        } catch (error) {
            console.error("Error checking wallet connection:", error);
        }
    };
    

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return alert("Please install MetaMask.");

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    const sendTransaction = async () => {
        try {
            if (!window.ethereum) return alert("Please install MetaMask.");
    
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = await getEthereumContract(); 
    
            if (!transactionContract) return;
    
            const parsedAmount = parseEther(amount); 
    
            setIsLoading(true); 
    
            const transactionHash = await transactionContract.addToBlockchain(
                addressTo,
                parsedAmount,
                message,
                keyword,
                { value: parsedAmount } 
            );

            await transactionHash.wait();
            setIsLoading(false); 

            setFormData({
                addressTo: '',
                amount: '',
                keyword: '',
                message: ''
            });
    
            
            toast.success(
                <div>
                    Transaction Successful! 🎉<br />
                    <a  className='text-blue-500 underline font-semibold'
                        href={`https://sepolia.etherscan.io/tx/${transactionHash.hash}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        View Transaction
                    </a>
                </div>
            );
    
            
        } catch (error) {
            console.error("Error sending transaction:", error);
            setIsLoading(false);
            toast.error("Transaction Failed!");
        }
    };
    

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [formData,currentAccount]);
    

    return (
        <TransactionContext.Provider value={{ 
            connectWallet, 
            currentAccount, 
            formData, 
            setFormData, 
            handleChange, 
            sendTransaction,
            isLoading
        }}>
            {children}
        </TransactionContext.Provider>
    );
};
