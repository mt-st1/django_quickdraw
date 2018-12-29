import React from 'react';
import Stroke from '../../classes/stroke';

const canvasStyle = {
  border: '1px solid gray',
  backgroundColor: 'white',
};

var stroke = null;

class SampleCanvas extends React.Component {
  constructor() {
    super();
    this.state = {
      isDrawing: false,
      drawStrokes: []
    };
  }

  getContext() {
    if (this.canvas != null) {
      return this.canvas.getContext('2d');
    }
    return;
  }

  beginDrawing(x, y) {
    this.setState({ isDrawing: true });
    stroke = new Stroke();
    stroke.x_list.push(x);
    stroke.y_list.push(y);
    const cxt = this.getContext();
    cxt.moveTo(x, y);
  }

  finishDrawing() {
    let strokes = this.state.drawStrokes;
    if (stroke !== null) {
      strokes.push(stroke)
      this.setState({ isDrawing: false, drawStrokes: strokes });
      stroke = null;
    }
  }

  draw(x, y) {
    if (!this.state.isDrawing) {
      return;
    }
    const ctx = this.getContext();
    ctx.lineTo(x, y);
    ctx.stroke();
    if (stroke !== null) {
      stroke.x_list.push(x);
      stroke.y_list.push(y);
    }
  }

  render() {
    return (
      <canvas
        ref={ref => { this.canvas = ref }}
        width="320px"
        height="320px"
        onMouseDown={e => { this.beginDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY) }}
        onMouseUp={() => { this.finishDrawing() }}
        onMouseLeave={() => { this.finishDrawing() }}
        onMouseMove={e => { this.draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY) }}
        style={canvasStyle}
      />
    );
  }
}

export default SampleCanvas;