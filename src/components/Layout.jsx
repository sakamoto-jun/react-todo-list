function Layout({ children }) {
  const layoutClass =
    "w-[50%] p-8 mx-auto border-[1px] border-solid border-gray-500 rounded-[6px]";

  return <div className={layoutClass}>{children}</div>;
}

export default Layout;
