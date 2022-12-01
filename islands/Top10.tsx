import mimeDbV1520 from "https://deno.land/std@0.150.0/media_types/vendor/mime-db.v1.52.0.ts";
import { Component } from "preact";
import { Birds as Props } from "../shared/read-bird.tsx";

// deno-lint-ignore no-var no-explicit-any
declare var ApexCharts: any;

export default class Top10 extends Component<Props> {
  div: HTMLDivElement | undefined | null;

  // deno-lint-ignore no-explicit-any
  chart: any;

  chartRender() {
    const monthly = this.props.monthly;
    const birds = this.props.birds.map((bird) => {
      const data = bird.data.map((v, i) => Math.ceil(v * 100 / monthly[i]));
      const sum = data.reduce((v1, v2, i) => v1 + v2, 0);
      return { data: data, name: bird.names.kana, value: sum * 100 / 12 };
    }).sort((v1, v2) => v2.value - v1.value).slice(0, 10);

    const data = birds.map((bird) => ({ data: bird.data, name: bird.name }));
    const categories = [];
    for (let i = 1; i < 13; i++) {
      categories.push(`${i}月`);
    }

    const options = {
      series: data,
      chart: {
        type: "line",
        height: 720,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 4,
      },
      xaxis: {
        categories: categories,
      },
      yaxis: {
        show: false,
      },
    };

    this.chart = new ApexCharts(this.div, options);
    this.chart.render();
  }

  componentDidMount() {
    this.chartRender();
  }

  render() {
    return (
      <>
        <div class="mt-[-1rem] mx-2 text-base" ref={(elm) => this.div = elm}>
        </div>
      </>
    );
  }
}
