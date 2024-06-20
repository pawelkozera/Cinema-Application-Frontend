import React, { useState, useEffect } from 'react';
import { Table, Switch, Button, Space } from '@mantine/core';
import { useParams } from "react-router-dom";
import CustomNotification from '../../components/CustomNotification';

import './admin_style.css';

function AdminTransactions() {
    const [isAdmin, setIsAdmin] = useState(false);
    const token = JSON.parse(localStorage.getItem('JWT'));
    const [transactions, setTransactions] = useState([]);

    const checkRole = async (role) => {
        try {
            const response = await fetch(`http://localhost:8080/api/checkRole?role=${role}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.jwtToken}`
                }
            });
            if (response.ok) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    useEffect(() => {
        const fetchRole = async () => {
            if (token) {
                const isAdmin = await checkRole('ADMIN');
                setIsAdmin(isAdmin);
            }
        };

        fetchRole();
    }, [token]);

    const fetchTransactions = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/order/transactions`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.jwtToken}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setTransactions(data);
                console.log(data);
            } else {
                console.error('Failed to fetch transactions');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    useEffect(() => {
        fetchTransactions();
    }, []);

    const updatePaidStatus = async (id, newPaidStatus) => {
        try {
            const response = await fetch(`http://localhost:8080/api/order/changePaid/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.jwtToken}`
                },
                body: JSON.stringify({ paid: newPaidStatus })
            });
            if (response.ok) {
                setTransactions(transactions.map(transaction => 
                    transaction.id === id ? { ...transaction, paid: newPaidStatus } : transaction
                ));
            } else {
                console.error('Failed to update paid status');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const { cinemaName } = useParams();

    return (
        <div className='admin_container'>
            {isAdmin && (
                <div className="admin_transactions">
                    <Table>
                        <thead>
                            <tr>
                                <th>Payment ID</th>
                                <th>Payer ID</th>
                                <th>Cena</th>
                                <th>Waluta</th>
                                <th>Metoda</th>
                                <th>Opis</th>
                                <th>Opłacony</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td>{transaction.paymentId}</td>
                                    <td>{transaction.payerId}</td>
                                    <td>{transaction.price}</td>
                                    <td>{transaction.currency}</td>
                                    <td>{transaction.method}</td>
                                    <td>{transaction.description}</td>
                                    <td>
                                        <Switch
                                            checked={transaction.paid}
                                            onChange={(event) => 
                                                updatePaidStatus(transaction.id, event.currentTarget.checked)
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
}

export default AdminTransactions;
