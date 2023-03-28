import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class Chart extends Component {


    static defaultProps = {
        noData: 0,
        yesData: 0
    }
    //  Setting the state of the chartData object. 

    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['No','Yes'],
                datasets: [{
                    label: 'Votes',
                    data: [this.props.noData,this.props.yesData,0],
                    backgroundColor:[
                        'rgba(237, 45, 45,0.7)',
                        'rgba(28, 181, 28,0.7)'
                    ]
                }]
            }
        }
    }

    // This function is called when the component is mounted
    test() {
        console.log(this.props.noData);
        console.log(this.props.yesData);
    }

    //Function is called after the component is rendered
    componentDidMount(){
        this.test();
    }

    render() {
        return(
            <div className="chart">
            <Bar 
                data = {this.state.chartData}
                options = {{
                    title: {
                        display:true,
                        text: 'Poll Voting Data'
                    },
                    legend: {
                        display: false
                    }
                }}
            />
            </div>
        )
    }
}

export default Chart;