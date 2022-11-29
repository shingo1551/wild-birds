import { Component } from "preact";

// deno-lint-ignore no-var no-explicit-any
declare var ApexCharts: any;

interface Props {
  data: number[];
}

export default class Chart extends Component<Props> {
  div: HTMLDivElement | undefined | null;

  // deno-lint-ignore no-explicit-any
  chart: any;

  chartRender() {
    const options = {
      chart: {
        type: "bar",
      },
      series: [
        {
          name: "bird",
          data: this.props.data,
        },
      ],
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
    };

    this.chart = new ApexCharts(this.div, options);
    this.chart.render();
  }

  componentDidMount() {
    this.chartRender();
  }

  render() {
    return <div class="max-w-4xl" ref={(elm) => this.div = elm}></div>;
  }
}
