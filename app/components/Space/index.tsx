interface Props {
  height: number;
}

export default function Space(props: Props) {
  return <div role="presentation" style={{ height: props.height }} />;
}
