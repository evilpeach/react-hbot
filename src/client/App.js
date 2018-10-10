import React, { Component } from 'react';
import InformationForm from './components/InformationForm';
import styled from 'styled-components';

const BGFrame = styled.div`
  positon: relative;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  
  render() {
    
    return(
      <BGFrame>
        Main Page
      </BGFrame>
    ) 
  }
}

export default App;
