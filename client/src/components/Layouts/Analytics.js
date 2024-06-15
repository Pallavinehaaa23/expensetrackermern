import React from 'react';
import { Line, Circle } from 'rc-progress';
import { Progress } from 'antd';
// import 'antd/dist/antd.css';

const Analytics = ({ alltrans }) => {
  const categories=['salary','tip','projet','food','movie','bills','medical','fee','tax'];
  const totaltrans = alltrans.length;
  const totalincometrans = alltrans.filter((trans) => trans.type === 'income');
  const totalexpensetrans = alltrans.filter((trans) => trans.type === 'expense');
  const totalincomepercent = (totalincometrans.length / totaltrans) * 100;
  const totalexpensepercent = (totalexpensetrans.length / totaltrans) * 100;
  const totalTurnover = alltrans.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = alltrans
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = alltrans
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="card" style={{ width: '28rem' }}>
        <div className="card-header">
          Total transactions: {totaltrans}
        </div>
        <div className="card-body">
          <h5>Income: {totalincometrans.length}</h5>
          <h5>Expense: {totalexpensetrans.length}</h5>
        </div>
       
          <div  style={{display:'flex'}}>
           
            <Circle percent={totalincomepercent.toFixed(0)} strokeWidth={4} strokeColor="green" style={{height:'10pc'}}/> 
            <div style={{
              position: 'absolute',
              top: '70%',
              left: '20%',
              transform: 'translate(-50%, -50%)',
              fontSize: '26px',
              fontWeight: 'bold',
              color: 'green'
            }}>
              {totalincomepercent.toFixed(0)}%
            </div>
            <Circle percent={totalexpensepercent.toFixed(0)} strokeWidth={4} strokeColor="red" style={{height:'10pc'}}/> 
            <div style={{
              position: 'absolute',
              top: '70%',
              left: '55%',
              transform: 'translate(-50%, -50%)',
              fontSize: '26px',
              fontWeight: 'bold',
              color: 'green'
            }}>
              {totalexpensepercent.toFixed(0)}%
            </div>
         
        </div>
        
      </div>
      <div className="card" style={{ width: '28rem' }}>
        <div className="card-header">
          Total transactions: {totaltrans}
        </div>
        <div className="card-body">
          <h5>Income: {totalIncomeTurnover}</h5>
          <h5>Expense: {totalExpenseTurnover}</h5>
        </div>
       
          <div  style={{display:'flex'}}>
           
            <Circle percent={totalIncomeTurnoverPercent.toFixed(0)} strokeWidth={4} strokeColor="green" style={{height:'10pc'}}/> 
            <div style={{
              position: 'absolute',
              top: '70%',
              left: '20%',
              transform: 'translate(-50%, -50%)',
              fontSize: '26px',
              fontWeight: 'bold',
              color: 'green'
            }}>
              {totalIncomeTurnoverPercent.toFixed(0)}%
            </div>
            <Circle percent={totalExpenseTurnoverPercent.toFixed(0)} strokeWidth={4} strokeColor="red" style={{height:'10pc'}}/> 
            <div style={{
              position: 'absolute',
              top: '70%',
              left: '55%',
              transform: 'translate(-50%, -50%)',
              fontSize: '26px',
              fontWeight: 'bold',
              color: 'green'
            }}>
              {totalExpenseTurnoverPercent.toFixed(0)}%
            </div>
         
        </div>
        
      </div>
      <div className='row mt-3' >
        <div className='col md-5'>
          <h4>Categorywise income</h4>
          {
            categories.map(category => {
              const amt=alltrans.filter(trans=>trans.type==='income'&& trans.category===category).reduce((acc,trans)=>acc+trans.amount,0)
              return(
                amt>0 &&(
              <div className='card'style={{width:'14pc'}}>
                <div className='card-body'>
                  <h5>{category}</h5>
                  <Progress
                      percent={((amt / totalIncomeTurnover) * 100).toFixed(0)}/>
                </div>
              </div>
              )
              )
            })
           
          }
        </div>
      </div>
      <div className='row mt-3' >
        <div className='col md-5'>
          <h4>Categorywise expense</h4>
          {
            categories.map(category => {
              const amt=alltrans.filter(trans=>trans.type==='expense'&& trans.category===category).reduce((acc,trans)=>acc+trans.amount,0)
              return(
                amt>0 &&(
              <div className='card'style={{width:'14pc'}}>
                <div className='card-body'>
                  <h5>{category}</h5>
                  <Progress
                      percent={((amt / totalExpenseTurnover) * 100).toFixed(0)}/>
                </div>
              </div>
              )
              )
            })
           
          }
        </div>
      </div>
     
    </>
  );
};

export default Analytics;
