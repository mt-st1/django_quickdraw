import React from 'react';
import DrawingCanvas from '../drawing_canvas';

const titleStyle = {
  textAlign: 'center',
  backgroundColor: '#ffd139',
};

const DrawingPage = () => (
  <div>
    <h1 style={titleStyle}>
      Instant Drawing!
    </h1>
    <DrawingCanvas />
  </div>
);

export default DrawingPage;