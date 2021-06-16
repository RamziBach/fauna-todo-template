import Header from '@components/Header';

const Layout = ({ children }) => {
  const layout = {
    width: '40%',
    margin: '0 auto',
  };

  return (
    <div style={layout}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
