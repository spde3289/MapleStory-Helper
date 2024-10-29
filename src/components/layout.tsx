import NavBar from "./commonLayout/NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <section className="bg-gray-200 w-full h-screen flex-1">
        {children}
      </section>
    </>
  );
};

export default Layout;
