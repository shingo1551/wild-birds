import mimeDbV1520 from "https://deno.land/std@0.150.0/media_types/vendor/mime-db.v1.52.0.ts";
import { Component } from "preact";
import { Birds as Props } from "../shared/read-bird.tsx";

// deno-lint-ignore no-var no-explicit-any
declare var ApexCharts: any;

export default class Top30 extends Component<Props> {
  div: HTMLDivElement | undefined | null;

  // deno-lint-ignore no-explicit-any
  chart: any;

  chartRender() {
    const monthly = this.props.monthly;
    const birds = this.props.birds.map((bird) => {
      const sum = bird.data.reduce((v1, v2, i) => v1 + v2 / monthly[i], 0);
      return { data: bird.data, name: bird.names.kana, value: Math.ceil(sum * 100 / 12) };
    }).sort((v1, v2) => v2.value - v1.value).slice(0, 30);

    const data = birds.map((bird) => bird.value);

    const options = {
      series: [{
        data: data,
      }],
      chart: {
        type: "bar",
        height: 720,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: birds.map((bird) => bird.name),
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
        <p class="mb-4 mt-[-1rem] text-center text-sm">観察頻度 (%)</p>
      </>
    );
  }
}
