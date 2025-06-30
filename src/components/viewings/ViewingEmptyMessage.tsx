interface ViewingEmptyMessageProps {
  message: string;
}

const ViewingEmptyMessage = ({ message }: ViewingEmptyMessageProps) => {
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <p className="text-body1-med text-gray-400">{message}</p>
    </div>
  );
};

export default ViewingEmptyMessage;
