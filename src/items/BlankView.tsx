const BlankView: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = (props) => {
  return <div className={props.className} />;
};

export default BlankView;
