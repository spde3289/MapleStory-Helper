import NavBar from "./commonLayout/navBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <section className="bg-gray-100 w-full h-screen flex-1">
        {children}
      </section>
    </>
  );
};

export default Layout;
