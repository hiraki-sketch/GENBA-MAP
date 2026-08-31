type PageCanvasProps = {
  children: React.ReactNode;
};

export function PageCanvas({ children }: PageCanvasProps) {
  return (
    <div className="flex flex-1 flex-col overflow-auto bg-[#F3F7F4]">
      <div className="mx-auto flex w-full max-w-[1080px] flex-col px-10 py-12">
        {children}
      </div>
    </div>
  );
}
