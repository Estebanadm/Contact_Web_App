import { Button } from '@mui/material';
import React from 'react';

function PopUp(props) {
  return (props.trigger) ? (
    <div className="popUp">
      <div className="popUpInner">
        <Button className="close-button">Close</Button>
        {props.children}
      </div>
    </div>
  ) : '';
}

export default PopUp;
