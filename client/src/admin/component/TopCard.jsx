import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';


function TopCard() {
  const [schoolAgregate, setSchoolAgregate] = useState([
    { title: 'Total Students', value: 1200 },
    { title: 'Total Teachers', value: 75 },
    { title: 'Total Classes', value: 30 },
  ]);
  return (
    <>
      {
        schoolAgregate.map((item, index) => (
         <div className="col-md-4"  key={index}>
           <Card key={index} className="text-center">
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text style={{ fontSize: '24px', fontWeight: 'bold' }}>{item.value}</Card.Text>
            </Card.Body>
          </Card>
         </div>
        ))
      }
    </>
  );
}

export default TopCard;