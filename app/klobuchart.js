import * as d3 from 'd3';
import * as c3 from 'c3';

class PrezChart {

    constructor(target) {
        this.target = target;
        this.chartCounts = null;
    }

    render() {
        var self = this;

        var padding = {
            top: 20,
            right: 40,
            bottom: 20,
            left: 60,
        };

        self.chartCounts = c3.generate({
            bindto: self.target,
            padding: padding,
            data: {
                columns: [
                    ['2019', 18104,24438,35745,35109,29535,46852],
                    ['Klobuchar', 0,8712,8955,5027,3496,8341],
                    ['2015', 6080,6053,8398,8013,11505,13760]
                ],
                types: {
                    '2015': 'spline',
                    '2019': 'area',
                    'Klobuchar': 'area',
                },
                labels: {
                    format: {
                        // '2015': d3.format(','),
                        // '2019': d3.format(',')
                    }
                },
                line: {
                    connectNull: true
                },
                groups: [['Klobuchar', '2019']]
            },
            legend: {
                show: false
            },
            point: {
                show: false,
            },
            color: {
                pattern: ['#67B4C2','#0D4673','#969696']
            },
            axis: {
                // rotated: true,
                y: {
                    show: true,
                    max: 60000,
                    min: 0, 
                    padding: {
                        bottom: 0,
                        top: 0
                    },
                    tick: {
                        count: 4,
                        values: [0, 20000, 40000, 60000],
                        format: d3.format(',')
                    }
                },
                x: {
                    padding: {
                        right: 0,
                        left: 0
                    },
                    type: 'category',
                    categories: ['Jan.','Feb.','Mar.','April','May','June'],
                    tick: {
                        multiline: false
                    }
                }
            },
            grid: {
                focus: {
                    show: false
                }
            }
        });

        // d3.selectAll(".c3-target-2019")
        // .selectAll(".c3-bar, .c3-texts")
        // .attr("transform", "translate(0, 4)");

    }


}

export {
    PrezChart as
    default
}