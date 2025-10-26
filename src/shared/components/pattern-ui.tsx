export const PatternUI = () => {
  return (
    <div
      className="absolute inset-0"
      style={{
        zIndex: -1,
        backgroundImage: `
        linear-gradient(45deg, transparent 49%, #f4f4f5 45%, #f4f4f5 50%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, #f4f4f5 45%, #f4f4f5 50%, transparent 51%)
      `,
        backgroundSize: "40px 40px",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 0% 100%, #000 50%, transparent 90%)",
        maskImage: "radial-gradient(ellipse 80% 80% at 0% 100%, #000 50%, transparent 90%)",
      }}
    />
  );
};
