import React from 'react';
import Stroke from '../classes/stroke';
// import { Button } from 'react-bootstrap';
import { FaEraser } from 'react-icons/fa';

const drawingContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
}

const canvasStyle = {
  border: '5px solid orange',
  backgroundColor: 'white',
};

const eraserIconStyle = {
  width: '50px',
  height: '50px',
  marginLeft: '10px',
  cursor: 'pointer',
};

const CANVAS_WIDTH = 512;
const CANVAS_HIGHT = 512;
const CANVAS_LINE_WIDTH = 3;

var stroke = null;

class DrawingCanvas extends React.Component {
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
    if ((0 <= x && x <= CANVAS_WIDTH) && (0 <= y && y <= CANVAS_HIGHT)) {
      stroke.x_list.push(x);
      stroke.y_list.push(y);
    }
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
    if (stroke !== null && ((0 <= x && x <= CANVAS_WIDTH) && (0 <= y && y <= CANVAS_HIGHT))) {
      const xList = stroke.x_list;
      const yList = stroke.y_list;
      const prevX = xList[xList.length - 1];
      const prevY = yList[yList.length - 1];
      if (!(x === prevX && y === prevY)) {
        const ctx = this.getContext();
        ctx.lineWidth = CANVAS_LINE_WIDTH;
        ctx.lineTo(x, y);
        ctx.stroke();
        xList.push(x);
        yList.push(y);
      }
    }
  }

  clearCanvas() {
    if (this.state.drawStrokes.length == 0) {
      return;
    }
    const ctx = this.getContext();
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.globalAlpha = 1.0;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HIGHT);
    this.setState({ isDrawing: false, drawStrokes: [] });
  }

  render() {
    return (
      <div style={drawingContainerStyle}>
        <canvas
          ref={ref => { this.canvas = ref }}
          width={`${CANVAS_WIDTH}px`}
          height={`${CANVAS_HIGHT}px`}
          onMouseDown={e => { this.beginDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY) }}
          onMouseUp={() => { this.finishDrawing() }}
          onMouseLeave={() => { this.finishDrawing() }}
          onMouseMove={e => { this.draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY) }}
          style={canvasStyle}
        />
        <FaEraser
          onClick={() => { this.clearCanvas() }}
          style={eraserIconStyle}
        />
      </div>
    );
  }
}

export default DrawingCanvas;