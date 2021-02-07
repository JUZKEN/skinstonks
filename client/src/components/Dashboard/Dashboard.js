import React, { Component } from 'react';

class Dashboard extends Component {
   render() {
      return (
         <section className="Dashboard">
            <div className="row">
               <div className="col-md-8">
                  {/* TODO: Update username on greetings title */}
                  <h1 className="Dashboard-greetings">Hi Juzken!</h1>
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