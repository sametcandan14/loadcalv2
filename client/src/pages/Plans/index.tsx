const Plans = () => {
  const satir = 20;
  const satirsayisi = Array.from({ length: satir });
  return (
    <div className="container">
      <h3 className="text-center mt-2">Total Quantity: 750</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 3fr",
          gap: "10px",
          alignItems: "center",
          padding: "5px",
        }}
      >
        <div
          style={{
            display: "grid",
            alignContent: "center",
            justifyItems: "center",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {satirsayisi.map(() => (
            <div
              style={{
                height: "20px",
                width: "100%",
                border: "2px solid black",
              }}
            ></div>
          ))}
        </div>
        <div>as</div>
      </div>
    </div>
  );
};

export default Plans;
