export interface Props {
  comment: string;
}

export function Comment({ comment }: Props) {
  return (
    <div class="m-8">
      <p style="text-indent: 1rem;">{comment}</p>
    </div>
  );
}
