interface Props extends React.HTMLAttributes<HTMLSpanElement> {}

export const Brand = ({ className, ...props }: Props) => {
  return (
    <span {...props} className="text-foreground text-lg font-semibold">
      Ascendia
    </span>
  );
};
