import React from 'react';
import SchoolCalender from '../component/SchoolCalender';
import AttendanceChart from '../component/AttendanceChart';
import MonthlyEarningsChart from '../component/MonthlyEarningsChar';
function DashboardHome() {
  return <div className="placeholder-box py-4 ">
    <div className="row" >
      <div className="col-md-8   d-flex flex-column align-items-center justify-content-center gap-3" >
        <div className="cardsection"><h3>card will go here</h3></div>
        <div className="rounded" style={{ backgroundColor: 'white', width: '100%' }}>
          <MonthlyEarningsChart />
        </div>
        <div className="rounded" style={{ backgroundColor: 'white', width: '100%' }}>
          <AttendanceChart />
        </div>
      </div>
      <div className="col-md-4">
        <SchoolCalender />
      </div>
    </div>
    <div className="container"></div>
  </div>;
}

export default DashboardHome;