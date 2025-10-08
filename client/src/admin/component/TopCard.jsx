import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import './topcard.css';

function TopCard() {
  const [schoolAgregate] = useState([
    { title: 'Total Students', value: 0 },
    { title: 'Total Teachers', value: 0 },
    { title: 'Total Revenue', value: 0 },
  ]);

  const colors = [
    'var(--primarycolor3)',
    'var(--primarycolor4)',
    'var(--primarycolor5)',
  ];

  return (
    <div className="row g-1">
      {schoolAgregate.map((item, index) => (
        <div className="col-md-4" key={index}>
          <div className="justadd">
            <Card
              className="text-center text-white shadow-sm border-0"
              style={{
                backgroundColor: colors[index % colors.length],
                borderRadius: '10px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
              }}
            >
              <Card.Body className="p-2">
                <div className="inner">
                  <div className="first-part d-flex align-items-center justify-content-between">
                    <p>{item.title}</p>
                    <p>{item.value}</p>
                  </div>
                </div>
                <div className="inner">
                  <div className="first-part d-flex align-items-center justify-content-between">
                    <p className='text-capitalize'>this month</p>
                    <p>{item.value}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopCard;



