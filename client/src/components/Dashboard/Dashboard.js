import React, { Component } from 'react';

class Dashboard extends Component {
   render() {
      return (
         <section className="Dashboard">
            <div className="row">
               <div className="col-md-8">
                  {/* TODO: Update username on greetings title */}
                  <h1 className="Dashboard-greetings Dashboard-box">Hi Juzken!</h1>
                  <div className="Dashboard-earnings Dashboard-box">
                     <h2>Earnings</h2>
                  </div>
                  <div className="Dashboard-activity Dashboard-box">
                     <h2>Activity</h2>
                  </div>
               </div>
               <div className="col-md-4">
                  Listings go here...
               </div>
            </div>
         </section>
      );
   }
}

export default Dashboard;