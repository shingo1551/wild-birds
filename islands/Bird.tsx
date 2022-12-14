import Chart from "../components/Chart.tsx";
import { Card } from "../components/Card.tsx";
import { Comment } from "../components/Comment.tsx";
import { Bird } from "../shared/read-bird.tsx";

export interface Props extends Bird {
  comment: string;
  monthly: number[];
}

export default function islands(props: Props) {
  return (
    <div class="max-w-screen-lg font-serif">
      <Card {...props.names} />
      <Chart data={props.data} monthly={props.monthly} />
      <Comment comment={props.comment} />
    </div>
  );
}
