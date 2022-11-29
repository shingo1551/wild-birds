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
    const categories = [];
    for (let i = 1; i < 13; i++)
      categories.push(`${i}月`);

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
        categories: categories
      },
    };

    this.chart = new ApexCharts(this.div, options);
    this.chart.render();
  }

  componentDidMount() {
    this.chartRender();
  }

  render() {
    return <div ref={(elm) => this.div = elm}></div>;
  }
}
