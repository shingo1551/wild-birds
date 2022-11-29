export interface Props {
  comment: string;
}

export function Comment({ comment }: Props) {
  return (
    <div class="m-4 max-w-4xl">
      <p style="text-indent: 1rem;">{comment}</p>
    </div>
  );
}
