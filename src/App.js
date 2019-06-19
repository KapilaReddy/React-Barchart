import React from 'react';
import './App.css';
import { Chart } from "react-google-charts";

const arr = ['Sales', 'Expenses', 'Profit'];
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showData: false,
      data: [['Year', {type: 'string', role: 'tooltip', 'p': {'html': true}}, 'Sales', 'Expenses', 'Profit'],
             ['2014', this.createCustomHTMLContent('', 1000, 400, 200), 1000, 400, 200],
             ['2015', this.createCustomHTMLContent('', 1000, 400, 200), 1170, 460, 250],
             ['2016', this.createCustomHTMLContent('', 1000, 400, 200), 660, 1120, 300],
             ['2017', this.createCustomHTMLContent('', 1000, 400, 200), 1030, 540, 350]]
    }
  }

  createCustomHTMLContent(flagURL, totalGold, totalSilver, totalBronze) {
    return '<div style="padding:5px 5px 5px 5px;">' +
        '<table class="medals_layout">' + '<tr>' +
        '<td>'+ arr[0] +'</td>' +
        '<td><b>$' + totalGold + '</b></td>' + '</tr>' + '<tr>' +
        '<td>'+ arr[1] +'</td>' +
        '<td><b>$' + totalSilver + '</b></td>' + '</tr>' + '<tr>' +
        '<td>'+ arr[2] +'</td>' +
        '<td><b>$' + totalBronze + '</b></td>' + '</tr>' + '</table>' + '</div>';
  }

  toggleData() {
    this.setState({
      showData: !this.state.showData
    });
  }

  renderLabels() {
    let result = [];
    for (let i = 0; i < this.state.data.length; i++) {
      if(i != 0) {
        result.push(
          <button className="mrg-l-r-10" dangerouslySetInnerHTML={{__html:this.state.data[i][0]}} />
        );
      }
    };
    return result;
  }

  render() {
    return (
      <div className="container">
        <div className="wid-30 flex-column-between">
          <div className="white-bg">
            <h4>Filters</h4>
            <ul>
              <li>Filter-1: </li>
              <li>Filter-2: </li>
            </ul>
          </div>
          <button className="submit" onClick={() => this.toggleData()}> Submit </button>
        </div>
        <div className="wid-70">
          {this.state.showData && 
            <div className="flex-column-between">
              <div className="white-bg">
                <h4 className="text-center">Expenses by Month</h4>
                <Chart
                height={'70vh'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={this.state.data}
                options={{
                  // Material design options
                  chart: {
                    title: 'Company Performance',
                    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                  },
                  vAxis: { 
                    ticks: [{v:0, f:'$0'},
                            {v:500, f:'$500'},
                            {v:1000, f:'$1000'},
                            {v:1500, f:'$1500'},
                            {v:2000, f:'$2000'}]
                  },
                  isStacked: true,
                  bars: 'vertical',
                  focusTarget: 'category',
                  tooltip: { isHtml: true }
                }}
                // For tests
                rootProps={{ 'data-testid': '2' }}/>
              </div>
              <div className="text-center labels-data">
                {this.renderLabels()}
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default App;
