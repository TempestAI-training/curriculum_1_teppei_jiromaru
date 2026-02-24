type ChatPageProps = {
  setIsVisible: (value: boolean) => void;
};

export const ChatPage = ({ setIsVisible }: ChatPageProps) => {
  return (
    <>
      <div>back</div>
      <button onClick={() => setIsVisible(true)}>back</button>
    </>
  );
};
