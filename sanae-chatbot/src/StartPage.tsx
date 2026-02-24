type StartPageProps = {
  setIsVisible: (value: boolean) => void;
};

export const StartPage = ({ setIsVisible }: StartPageProps) => {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: 20,
            border: "1px solid #61dafb",
            marginTop: 20,
            width: 300,
          }}
        >
          <p>高市Bot</p>
          <button onClick={() => setIsVisible(false)}>start</button>
        </div>
      </div>
    </>
  );
};
