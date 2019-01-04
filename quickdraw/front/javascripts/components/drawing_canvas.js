import React from 'react';
import axios from 'axios';
import Stroke from '../classes/stroke';
import { Categories } from '../constants/categories';
import { FaEraser, FaForward } from 'react-icons/fa';

const drawThemeStyle = {
  textAlign: 'center',
  fontSize: '32px',
  fontWeight: '450',
};

const drawAreaStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginLeft: '36px',
};

const canvasStyle = {
  border: '5px solid orange',
  backgroundColor: 'white',
};

const eraserIconStyle = {
  width: '36px',
  height: '36px',
  marginLeft: '10px',
  cursor: 'pointer',
};

const forwardIconStyle = {
  width: '34px',
  height: '34px',
  marginLeft: '11px',
  marginTop: '10px',
  cursor: 'pointer',
}

const predictAreaStyle = {
  textAlign: 'center',
  marginTop: '10px',
};

const rightPredictStyle = {
  fontSize: 'x-large',
  padding: '2px 5px',
  margin:  '2em 0',
  border: 'solid 3px #ff0000',
  borderRadius: '10px',
}

const wrongPredictStyle = {
  fontSize: 'x-large',
};

const CANVAS_WIDTH = 256;
const CANVAS_HIGHT = 256;
const CANVAS_LINE_WIDTH = 3;
const CATEGORY_SIZE = Categories.length;

var stroke = null;

const convertToDrawingData = (drawStrokes) => (
  {drawing_data: [drawStrokes.map(stroke => [stroke.x_list, stroke.y_list])]}
);

const getCategoryRandom = () => (
  Categories[Math.floor(Math.random() * CATEGORY_SIZE)]
);

const renderThemeArea = (drawTheme) => (
  <div style={drawThemeStyle}>
    [ {drawTheme} ]
  </div>
);

const renderPredicts = (predicts, rightPredictIdx) => {
  if (predicts.length !== 0) {
    return (
      <div>
        {predicts.map((predict, idx) => {
          const predictStyle = idx === rightPredictIdx ? rightPredictStyle : wrongPredictStyle;
          return (
            <span key={idx}>
              <span style={predictStyle}>{idx+1}:{predict}</span>
              &nbsp;&nbsp;
            </span>
          );
        })}
      </div>
    )
  }
};

class DrawingCanvas extends React.Component {
  constructor() {
    super();
    this.state = {
      isDrawing: false,
      isRightPredict: false,
      drawTheme: null,
      drawStrokes: [],
      predicts: [],
      rightPredictIdx: null,
    };
  }

  componentDidMount() {
    const drawTheme = getCategoryRandom();
    this.setState({ drawTheme });
  }

  getContext() {
    if (this.canvas != null) {
      return this.canvas.getContext('2d');
    }
    return;
  }

  fetchPredictResult(drawingData) {
    axios.get('/predict_drawing', { params: drawingData })
      .then(res => {
        const predicts = res.data.predict_result;
        const rightPredictIdx = predicts.indexOf(this.state.drawTheme);
        if (rightPredictIdx !== -1) {
          this.setState({
            isRightPredict: true,
            predicts,
            rightPredictIdx
          });
        } else {
          this.setState({
            isRightPredict: false,
            predicts,
            rightPredictIdx: null
          });
        }
      })
      .catch(err => {console.log('axiosGetError', err);})
  }

  beginDrawing(x, y) {
    this.setState({ isDrawing: true });
    stroke = new Stroke();
    if ((0 <= x && x <= CANVAS_WIDTH) && (0 <= y && y <= CANVAS_HIGHT)) {
      stroke.x_list.push(x);
      stroke.y_list.push(y);
    }
    const ctx = this.getContext();
    ctx.moveTo(x, y);
  }

  finishDrawing() {
    let strokes = this.state.drawStrokes;
    if (stroke !== null) {
      strokes.push(stroke)
      this.setState({
        isDrawing: false,
        drawStrokes: strokes
      });
      stroke = null;
      this.fetchPredictResult(convertToDrawingData(this.state.drawStrokes));
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
    this.setState({
      isDrawing: false,
      isRightPredict: false,
      drawStrokes: [],
      predicts: []
    });
  }

  changeTargetDrawing() {
    const drawTheme = getCategoryRandom();
    this.clearCanvas();
    this.setState({ drawTheme });
  }

  renderActionIcons() {
    return (
      <div>
        <FaEraser
          onClick={() => { this.clearCanvas() }}
          style={eraserIconStyle}
        />
        <br/>
        <FaForward
          onClick={() => { this.changeTargetDrawing() }}
          style={forwardIconStyle}
        />
      </div>
    );
  }

  renderDrawArea() {
    return (
      <div style={drawAreaStyle}>
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
        {this.renderActionIcons()}
      </div>
    );
  }

  renderPredictArea() {
    return (
      <div style={predictAreaStyle}>
        {renderPredicts(this.state.predicts, this.state.rightPredictIdx)}
      </div>
    );
  }

  render() {
    return (
      <div>
        {renderThemeArea(this.state.drawTheme)}
        {this.renderDrawArea()}
        {this.renderPredictArea()}
      </div>
    );
  }
}

export default DrawingCanvas;