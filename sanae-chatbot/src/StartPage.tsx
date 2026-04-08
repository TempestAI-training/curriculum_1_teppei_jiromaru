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
          backgroundColor: "#edf4f5",
        }}
      >
        <div
          style={{
            backgroundColor: "#fdfdfd",
            padding: 20,
            marginTop: 20,
            width: 300,
            height: "380px",
            borderRadius: "10px",
          }}
        >
          <p>高市Bot</p>
          <button
            onClick={() => setIsVisible(false)}
            style={{
              margin: "5px",
              padding: "4px 10px 4px 10px",
              height: "29px",
              backgroundColor: "#0939d6",
              color: "#ffffff",
              borderRadius: "20px",
              border: "none",
            }}
          >
            start
          </button>
        </div>
      </div>
    </>
  );
};
