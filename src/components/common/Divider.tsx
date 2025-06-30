interface DividerProps {
  className?: string;
}

const Divider = ({ className = "my-3" }: DividerProps) => {
  return <hr className={`border-t border-gray-200 ${className}`} />;
};

export default Divider;
