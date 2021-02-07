import React, { Component } from 'react';
import ActionButtons from './components/ActionButtons';

class Header extends Component {
   render() {
      return (
         <section id="Header">
            {/* TODO: Make page title dynamic */}
            <h2 className="Page-title">Dashboard</h2>
            <ActionButtons />
         </section>
      );
   }
}

export default Header;