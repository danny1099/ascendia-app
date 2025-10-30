interface AsideProps {
  child: React.ReactNode;
}

export const Aside = ({ child }: AsideProps) => {
  return (
    <aside className="bg-background col-start-1 row-span-2 row-start-1 flex flex-col max-sm:hidden sm:w-52 md:w-96">
      {child}
    </aside>
  );
};
