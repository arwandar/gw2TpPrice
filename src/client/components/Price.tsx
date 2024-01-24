import { splitPrice } from "../utils/utils";

const Price = ({ price }: { price: number | undefined }) => {
  if (!price) return <></>;

  const { isNeg, pc, pa, po } = splitPrice(price);

  return (
    <div
      style={{ display: "flex", alignItems: "center", justifyContent: "end" }}
    >
      {isNeg ? <span>-</span> : null}
      {po !== 0 && (
        <div style={{ display: "flex", marginLeft: "1rem" }}>
          <span>{po}</span> <img style={{ height: "1.5rem" }} src="/Gold.png" />
        </div>
      )}
      {pa !== 0 && (
        <div style={{ display: "flex", marginLeft: "0.5rem" }}>
          <span>{pa}</span>{" "}
          <img style={{ height: "1.5rem" }} src="/Silver.png" />
        </div>
      )}
      <div style={{ display: "flex", marginLeft: "0.5rem" }}>
        <span>{pc}</span> <img style={{ height: "1.5rem" }} src="/Copper.png" />
      </div>
    </div>
  );
};

export default Price;
