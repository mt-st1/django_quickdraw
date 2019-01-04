import React from 'react';
import DrawingCanvas from '../drawing_canvas';

const titleStyle = {
  textAlign: 'center',
  backgroundColor: '#ffd139',
  padding: '10px 0px',
  marginBottom: '30px',
};

const DRAWING_PAGE_TITLE = 'Instant Drawing!';

const DrawingPage = () => (
  <div>
    <h1 style={titleStyle}>
      {DRAWING_PAGE_TITLE}
    </h1>
    <DrawingCanvas />
  </div>
);

export default DrawingPage;