import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTableList } from "react-icons/fa6";
import { IoMdAnalytics } from "react-icons/io";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import Analytics from '../components/Layouts/Analytics';
import Layout from '../components/Layouts/Layout';
import axios from 'axios';
import moment from 'moment';

const Homepg = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [alltrans, setAlltrans] = useState([]);
  const [freq, setFreq] = useState('7');
  const [type, setType] = useState('all');
  const [view, setView] = useState('table');
  const [edit, setEdit] = useState(null);
  // const [delt, setDelt] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    type: 'income',
    category: 'salary',
    date: '',
    reference: '',
    description: ''
  });

  useEffect(() => {
    const getAll = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const payload = { userid: user._id, freq, type };
        if (freq === 'custom') {
          payload.startDate = startDate;
          payload.endDate = endDate;
        }
        const res = await axios.post('/api/transactions/getAlltransaction', payload);
        setAlltrans(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err, 'Failure');
      }
    };
    getAll();

    // If edit is not null, populate the form data with the transaction data to edit
    if (edit) {
    setShowModal(true);
      setFormData({
        name: edit.name,
        amount: edit.amount,
        type: edit.type,
        category: edit.category,
        date: edit.date,
        reference: edit.reference,
        description: edit.description
      });
    }
  }, [freq, startDate, endDate, type, edit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
 const del =async(transId)=>{
   try{
    await axios.post('/api/transactions/deltransaction', { transId: transId});
    // setDelt(true);
    // res.status(200).json('Delete success')
   }catch(err){
        console.log(err);
   }
 }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (edit) {
        await axios.post('/api/transactions/edittransaction', {
          payload: {
            ...formData,
            userid: user._id
          },
          transId: edit._id
        });
        console.log(' update success');
      } else {
        await axios.post('/api/transactions/addtransaction', { ...formData, userid: user._id });
        console.log('success');
      }
      setEdit(null);
    } catch (err) {
      console.log(err, 'failed');
    }
    setShowModal(false); // Close the modal after submission
  };

  return (
    <Layout>
      <div className='filters'>
        <div>
          <h6>Select Frequency</h6>
          <select value={freq} onChange={(e) => setFreq(e.target.value)}>
            <option value="7">Last 1 week</option>
            <option value="30">Last 1 month</option>
            <option value="365">Last 1 year</option>
            <option value="custom">Custom</option>
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">ALL</option>
            <option value="income">INCOME</option>
            <option value="expense">EXPENSE</option>
          </select>

          {freq === 'custom' && (
            <>
              <label>Start Date:</label>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
              <label>End Date:</label>
              <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            </>
          )}
        </div>
        <div className='icons' style={{ fontSize: '2pc', color: 'black' }}>
          <FaTableList className={`mx-2 ${view === 'table' ? 'active' : 'inactive'}`} onClick={() => setView('table')} />
          <IoMdAnalytics className={`mx-2 ${view === 'analytics' ? 'active' : 'inactive'}`} onClick={() => setView('analytics')} />
        </div>
        <div className='btn btn-primary' onClick={() => setShowModal(true)}>Add new</div>
      </div>
      <div className='content'>
        {view === 'table' ?
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Category</th>
                <th>Reference</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {alltrans.map((transaction, index) => (
                <tr key={index}>
                  <td>{moment(transaction.date).format('YYYY-MM-DD')}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.reference}</td>
                  <td>{transaction.description}</td>
                  <td>
                    <div className='acticon' style={{ display: 'flex' }}>
                      <MdOutlineEdit onClick={() => setEdit(transaction)} />
                      <MdDelete onClick={()=>del(transaction._id)}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          : <Analytics alltrans={alltrans} />}
        {showModal && (
          <div className="modal" style={{ display: 'block' }} tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{edit ? 'Edit transaction' : 'Add Transaction'}</h5>
                  <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <label>
                      Amount:
                      <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
                    </label>
                    <br /><br />
                    <label>
                      Type:
                      <select name="type" value={formData.type} onChange={handleChange} required>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>
                    </label>
                    <br /><br />
                    <label>
                      Category:
                      <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="salary">Salary</option>
                        <option value="tip">Tip</option>
                        <option value="project">Project</option>
                        <option value="food">Food</option>
                        <option value="movie">Movie</option>
                        <option value="bills">Bills</option>
                        <option value="medical">Medical</option>
                        <option value="fee">Fee</option>
                        <option value="tax">Tax</option>
                      </select>
                    </label>
                    <br /><br />
                    <label>
                      Date:
                      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    </label>
                    <br /><br />
                    <label>
                      Reference:
                      <input type="text" name="reference" value={formData.reference} onChange={handleChange} />
                    </label>
                    <br /><br />
                    <label>
                      Description:
                      <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                    </label>
                    <br /><br />
                    <button type="submit">Submit</button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Homepg;
