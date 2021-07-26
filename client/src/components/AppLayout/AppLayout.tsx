export type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return <div className="w-full h-full flex flex-col">{children}</div>;
}

export type HeadProps = {
  children: React.ReactNode;
};

function Head({ children }: HeadProps) {
  return (
    <header className="bg-cyan-700 h-16 flex items-center px-16 md:px-4">
      {children}
    </header>
  );
}

export type ChildrenProps = {
  children: React.ReactNode;
};

function Main({ children }: ChildrenProps) {
  return (
    <main className="flex-1 mx-auto md:w-full w-192 md:px-4 mt-12 md:mt-6">
      {children}
    </main>
  );
}

AppLayout.Head = Head;
AppLayout.Main = Main;
