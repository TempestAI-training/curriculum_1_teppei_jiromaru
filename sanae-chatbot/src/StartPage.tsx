type StartPageProps = {
  setIsVisible: (value: boolean) => void;
};

export const StartPage = ({ setIsVisible }: StartPageProps) => {
  return (
    <>
      <div>start</div>
      <button onClick={() => setIsVisible(false)}>start</button>
    </>
  );
};
