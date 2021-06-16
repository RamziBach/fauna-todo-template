import LogInOutButtons from '@components/LogInOutButtons';

const Header = () => {
  const header = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <header style={header}>
      <h1>Todo App</h1>
      <LogInOutButtons />
    </header>
  );
};

export default Header;
