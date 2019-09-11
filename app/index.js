/**
 * Main JS file for project.
 */

/**
 * Define globals that are added through the js.globals in
 * the config.json file, here, mostly so linting won't get triggered
 * and its a good queue of what is available:
 */
// /* global $, _ */

// Dependencies
import utils from './shared/utils.js';

// Mark page with note about development or staging
utils.environmentNoting();



/**
 * Adding dependencies
 * ---------------------------------
 * Import local ES6 or CommonJS modules like this:
 * import utilsFn from './shared/utils.js';
 *
 * Or import libraries installed with npm like this:
 * import module from 'module';
 */


/**
 * Adding Svelte templates in the client
 * ---------------------------------
 * We can bring in the same Svelte templates that we use
 * to render the HTML into the client for interactivity.  The key
 * part is that we need to have similar data.
 *
 * First, import the template.  This is the main one, and will
 * include any other templates used in the project.
 *
 *   `import Content from '../templates/_index-content.svelte.html';`
 *
 * Get the data parts that are needed.  There are two ways to do this.
 * If you are using the buildData function to get data, then add make
 * sure the config for your data has a `local: "content.json"` property
 *
 *  1. For smaller datasets, just import them like other files.
 *     `import content from '../assets/data/content.json';`
 *  2. For larger data points, utilize window.fetch.
 *     `let content = await (await window.fetch('../assets/data/content.json')).json();`
 *
 * Once you have your data, use it like a Svelte component:
 *
 * const app = new Content({
 *  target: document.querySelector('.article-lcd-body-content'),
 *  hydrate: true,
 *  data: {
 *    content
 *  }
 * });
 */



// Common code to get svelte template loaded on the client and hack-ishly
// handle sharing
//
// import Content from '../templates/_index-content.svelte.html
//
// $(document).ready(() => {
//   // Hack to get share back
//   let $share = $('.share-placeholder').size()
//     ? $('.share-placeholder')
//       .children()
//       .detach()
//     : undefined;
//   let attachShare = !$share
//     ? undefined
//     : () => {
//       $('.share-placeholder').append($share);
//     };

//   // Main component
//   const app = new Content({
//     target: document.querySelector('.article-lcd-body-content'),
//     hydrate: true,
//     data: {
//       attachShare
//     }
//   });
// });

import * as d3 from 'd3';

import AllChart from './all_chart.js';
import PrezChart from './prez_chart.js';
import KlobuChart from './klobuchart.js';

const chart1 = new AllChart('#allChart');
const chart2 = new PrezChart('#prezChart');
const chart3 = new KlobuChart('#klobuChart');

chart1.render();
chart2.render();
chart3.render();

$("#showhide").on("click", function(){
    $(".cutoff").toggle();
    $(".toggle").toggle();
});

var aspect = 550 / 400, chart = $("#map svg");
$(window).on("resize", function() {   
  var targetWidth = chart.parent().width();   
  chart.attr("width", targetWidth);   
  chart.attr("height", targetWidth / aspect);
});

$(window).on("load", function() {   
  var targetWidth = chart.parent().width();   
  chart.attr("width", targetWidth);   
  chart.attr("height", targetWidth / aspect);
});

var cartogram2 = {
    margin: {
        top: 40,
        right: 140,
        bottom: 0,
        left: 60
    },

    selector: '#map svg',

    init: function() {
        var self = this;

        self.$el = $(self.selector);

        self.width = 550 - self.margin.left - self.margin.right;
        self.height = 400 - self.margin.top - self.margin.bottom;

        self.svg = d3.select(self.selector)
            .attr('height', self.height + self.margin.top + self.margin.bottom)
            .attr('width', self.width + self.margin.left + self.margin.right)

        self.state_size = self.width / 12;
        self.state_padding = 2;

        self.map = self.svg.append('g')
            .attr('transform', 'translate(' + self.margin.left + ','
                  + self.margin.top + ')')

        self.drawMap();
    },

    drawMap: function() {
        var self = this;

        var color_scale = d3.scaleLinear().domain([0, 2500, 5000, 7500, 20000]).range(['#D1E6E1', '#A7E6E3', '#67B4C2', '#3580A3', '#0D4673']);

        var states = self.map.selectAll('.states')
            .data(self.state_pos_co2)
            .enter().append('g')
            .attr('class', 'state-groups');

        var state = states.append('rect')
            .attr('id', function(d) {
                return d.state_postal + "d";
            })
            .attr('class', 'state')
            .attr('fill', function(d) {
              return color_scale(d.donors);
            })
            .attr('rx', 0)
            .attr('ry', 0)
            .attr('x', function(d) {
                return d.column * (self.state_size + self.state_padding);
            })
            .attr('y', function(d) {
                return d.row * (self.state_size + self.state_padding);
            })
            .attr('width', self.state_size)
            .attr('height', self.state_size);

        var text = states.append('text')
            .attr('class', 'state-label')
            .attr('class', function(d) {
                return 'white';
            })
            .attr('dominant-baseline', 'central')
            .attr('x', function(d) {
                return (d.column * (self.state_size + self.state_padding))
                        + self.state_size / 2; })
            .attr('y', function(d) {
                return (d.row * (self.state_size + self.state_padding))
                    + self.state_size / 2; })
            .style('text-anchor', 'middle')
            .text(function(d) {
                return d.state_postal;
            });
    },

    state_pos_co2: [{'state_full':'Alabama','state_postal':'AL','row':5,'column':6,'donors':309,'color':'gray2'},
        {'state_full':'Alaska','state_postal':'AK','row':6,'column':0,'donors':160,'color':'gray2'},
        {'state_full':'Arizona','state_postal':'AZ','row':4,'column':1,'donors':1228,'color':'gray2'},
        {'state_full':'Arkansas','state_postal':'AR','row':4,'column':4,'donors':271,'color':'gray2'},
        {'state_full':'California','state_postal':'CA','row':3,'column':0,'donors':8838,'color':'purple3'},
        {'state_full':'Colorado','state_postal':'CO','row':3,'column':2,'donors':1605,'color':'purple3'},
        {'state_full':'Connecticut','state_postal':'CT','row':2,'column':9,'donors':1013,'color':'purple3'},
        {'state_full':'D.C.','state_postal':'DC','row':4,'column':8,'donors':841,'color':'purple3'},
        {'state_full':'Delaware','state_postal':'DE','row':3,'column':9,'donors':181,'color':'gray2'},
        {'state_full':'Florida','state_postal':'FL','row':6,'column':8,'donors':2772,'color':'gray2'},
        {'state_full':'Georgia','state_postal':'GA','row':5,'column':7,'donors':1091,'color':'gray2'},
        {'state_full':'Hawaii','state_postal':'HI','row':6,'column':-1,'donors':171,'color':'purple3'},
        {'state_full':'Idaho','state_postal':'ID','row':1,'column':1,'donors':203,'color':'purple3'},
        {'state_full':'Illinois','state_postal':'IL','row':1,'column':6,'donors':2545,'color':'purple3'},
        {'state_full':'Indiana','state_postal':'IN','row':2,'column':5,'donors':639,'color':'gray2'},
        {'state_full':'Iowa','state_postal':'IA','row':2,'column':4,'donors':1127,'color':'purple3'},
        {'state_full':'Kansas','state_postal':'KS','row':4,'column':3,'donors':385,'color':'gray2'},
        {'state_full':'Kentucky','state_postal':'KY','row':3,'column':5,'donors':404,'color':'gray2'},
        {'state_full':'Louisiana','state_postal':'LA','row':5,'column':4,'donors':249,'color':'gray2'},
        {'state_full':'Maine','state_postal':'ME','row':-1,'column':10,'donors':387,'color':'purple3'},
        {'state_full':'Maryland','state_postal':'MD','row':3,'column':8,'donors':1960,'color':'purple1'},
        {'state_full':'Massachusetts','state_postal':'MA','row':1,'column':9,'donors':2332,'color':'gray2'},
        {'state_full':'Michigan','state_postal':'MI','row':1,'column':7,'donors':1452,'color':'gray2'},
        {'state_full':'Minnesota','state_postal':'MN','row':1,'column':4,'donors':20668,'color':'gray5'},
        {'state_full':'Mississippi','state_postal':'MS','row':5,'column':5,'donors':89,'color':'gray2'},
        {'state_full':'Missouri','state_postal':'MO','row':3,'column':4,'donors':876,'color':'gray2'},
        {'state_full':'Montana','state_postal':'MT','row':1,'column':2,'donors':241,'color':'purple3'},
        {'state_full':'Nebraska','state_postal':'NE','row':3,'column':3,'donors':337,'color':'gray2'},
        {'state_full':'Nevada','state_postal':'NV','row':2,'column':1,'donors':437,'color':'gray2'},
        {'state_full':'New Hampshire','state_postal':'NH','row':0,'column':10,'donors':615,'color':'purple3'},
        {'state_full':'New Jersey','state_postal':'NJ','row':2,'column':8,'donors':1570,'color':'gray2'},
        {'state_full':'New Mexico','state_postal':'NM','row':4,'column':2,'donors':479,'color':'gray2'},
        {'state_full':'New York','state_postal':'NY','row':1,'column':8,'donors':4753,'color':'gray2'},
        {'state_full':'North Carolina','state_postal':'NC','row':4,'column':6,'donors':1455,'color':'purple1'},
        {'state_full':'North Dakota','state_postal':'ND','row':1,'column':3,'donors':291,'color':'purple3'},
        {'state_full':'Ohio','state_postal':'OH','row':2,'column':6,'donors':1341,'color':'gray2'},
        {'state_full':'Oklahoma','state_postal':'OK','row':5,'column':3,'donors':319,'color':'gray2'},
        {'state_full':'Oregon','state_postal':'OR','row':2,'column':0,'donors':1500,'color':'purple2'},
        {'state_full':'Pennsylvania','state_postal':'PA','row':2,'column':7,'donors':2225,'color':'gray2'},
        {'state_full':'Rhode Island','state_postal':'RI','row':2,'column':10,'donors':211,'color':'gray2'},
        {'state_full':'South Carolina','state_postal':'SC','row':4,'column':7,'donors':557,'color':'gray2'},
        {'state_full':'South Dakota','state_postal':'SD','row':2,'column':3,'donors':211,'color':'gray2'},
        {'state_full':'Tennessee','state_postal':'TN','row':4,'column':5,'donors':666,'color':'gray2'},
        {'state_full':'Texas','state_postal':'TX','row':6,'column':3,'donors':2563,'color':'gray2'},
        {'state_full':'Utah','state_postal':'UT','row':3,'column':1,'donors':321,'color':'gray2'},
        {'state_full':'Vermont','state_postal':'VT','row':0,'column':9,'donors':2110,'color':'purple3'},
        {'state_full':'Virginia','state_postal':'VA','row':3,'column':7,'donors':262,'color':'gray2'},
        {'state_full':'Washington','state_postal':'WA','row':1,'column':0,'donors':2609,'color':'gray2'},
        {'state_full':'West Virginia','state_postal':'WV','row':3,'column':6,'donors':121,'color':'gray2'},
        {'state_full':'Wisconsin','state_postal':'WI','row':1,'column':5,'donors':1590,'color':'purple3'},
        {'state_full':'Wyoming','state_postal':'WY','row':2,'column':2,'donors':89,'color':'purple3'}]

};

$(document).ready(function() {
  cartogram2.init();
});