import React, { Component } from 'react';
import ActionButtons from './components/ActionButtons';

class Header extends Component {
   render() {
      return (
         <section id="Header">
            <ActionButtons />
         </section>
      );
   }
}

export default Header;