import * as d3 from 'd3';
import * as c3 from 'c3';

class KlobuChart {

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
            left: 120,
        };

        self.chartCounts = c3.generate({
            bindto: self.target,
            padding: padding,
            data: {
                columns: [
                    ['Source', 0.294405998,0.399077278,0.243656286,0.062860438]
                ],
                type: 'bar',
                labels: {
                    format: {
                        'Source': d3.format('.0%')
                    }
                },
                line: {
                    connectNull: true
                }
            },
            legend: {
                show: false
            },
            color: {
                pattern: ['#3580A3']
            },
            axis: {
                rotated: true,
                y: {
                    show: false,
                    max: 1,
                    min: 0, 
                    padding: {
                        bottom: 0,
                        top: 0
                    },
                    tick: {
                        count: 4,
                        values: [0, 0.25, 0.50, 0.75, 1],
                        format: d3.format('.0%')
                    }
                },
                x: {
                    padding: {
                        right: 0,
                        left: 0
                    },
                    type: 'category',
                    categories: ['Outside MN','MN: Klobuchar Only','MN: Others'],
                    tick: {
                        multiline: false
                    }
                }
            },
            grid: {
                focus: {
                    show: false
                }
            },
            tooltip: {
                contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
                    return '<div class="chart-tooltip gray5"><span class="tooltip-label">' + d[0].x + ':</span>' +
                        '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span></div>'
                }
            }
        });

        d3.selectAll(".c3-target-unknown")
        .selectAll(".c3-bar, .c3-texts")
        .attr("transform", "translate(0, 15)");
    }

}

export {
    KlobuChart as
    default
}