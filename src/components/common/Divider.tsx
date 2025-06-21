interface DividerProps {
  my?: string;
}

const Divider = ({ my = "3" }: DividerProps) => {
  return <hr className={`my-${my} border-t border-gray-200`} />;
};

export default Divider;
