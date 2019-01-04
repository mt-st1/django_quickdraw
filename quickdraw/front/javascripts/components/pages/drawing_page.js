import React from 'react';
import axios from 'axios';
import Stroke from '../../classes/stroke';
import { Categories } from '../../constants/categories';
import { FaEraser, FaForward } from 'react-icons/fa';

const DRAWING_PAGE_TITLE = 'Instant Drawing!';
const CATEGORY_SIZE = Categories.length;
const CANVAS_WIDTH = 256;
const CANVAS_HIGHT = 256;
const CANVAS_LINE_WIDTH = 3;
const CANVAS_FILL_COLOR = 'white';

const convertToDrawingData = (drawStrokes) => (
  {drawing_data: [drawStrokes.map(stroke => [stroke.x_list, stroke.y_list])]}
);

const getCategoryRandom = () => (
  Categories[Math.floor(Math.random() * CATEGORY_SIZE)]
);

const renderPageTitle = () => (
  <h1>{DRAWING_PAGE_TITLE}</h1>
);

const renderDrawTheme = (drawTheme) => (
  <div className="theme-area">
    [ {drawTheme} ]
  </div>
);

const renderPredicts = (predicts, rightPredictIdx) => (
  <div className="predict-list">
    {predicts.map((predict, idx) => {
      const cName = idx === rightPredictIdx ? 'predict-right' : 'predict-wrong';
      return (
        <span key={idx}>
          <span className={cName}>
            {idx+1}:{predict}
          </span>
          &nbsp;&nbsp;
        </span>
      );
    })}
  </div>
);

var stroke = null;

class DrawingPage extends React.Component {
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
    if (this.state.drawStrokes.length === 0) {
      return;
    }
    const ctx = this.getContext();
    ctx.beginPath();
    ctx.fillStyle = CANVAS_FILL_COLOR;
    ctx.globalAlpha = 1.0;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HIGHT);
    this.setState({
      isDrawing: false,
      isRightPredict: false,
      drawStrokes: [],
      predicts: []
    });
  }

  changeDrawTheme() {
    const drawTheme = getCategoryRandom();
    this.clearCanvas();
    this.setState({ drawTheme });
  }

  renderActionIcons() {
    return (
      <div className="icon-list">
        <FaEraser
          className="icon-eraser"
          onClick={() => { this.clearCanvas() }}
        />
        <br/>
        <FaForward
          className="icon-forward"
          onClick={() => { this.changeDrawTheme() }}
        />
      </div>
    );
  }

  renderDrawCanvas() {
    return (
      <div className="canvas-area">
        <canvas
          ref={ref => { this.canvas = ref }}
          width={`${CANVAS_WIDTH}px`}
          height={`${CANVAS_HIGHT}px`}
          onMouseDown={e => { this.beginDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY) }}
          onMouseUp={() => { this.finishDrawing() }}
          onMouseLeave={() => { this.finishDrawing() }}
          onMouseMove={e => { this.draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY) }}
        />
        {this.renderActionIcons()}
      </div>
    );
  }

  renderPredictResult() {
    const predicts = this.state.predicts;
    const rightPredictIdx = this.state.rightPredictIdx;
    return (
      <div className="result-area">
        {predicts.length !== 0 && renderPredicts(predicts, rightPredictIdx)}
      </div>
    );
  }

  render() {
    return (
      <div className="drawing-page">
        {renderPageTitle()}
        {renderDrawTheme(this.state.drawTheme)}
        {this.renderDrawCanvas()}
        {this.renderPredictResult()}
      </div>
    );
  }
}

export default DrawingPage;