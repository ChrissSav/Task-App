import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header
      style={{
        padding: '20px 20px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'blue',
      }}
      className='header'
    >
      <h1>{title}</h1>
      {showAdd && (
        <Button
          color={showAdd ? 'red' : 'green'}
          text={showAdd ? 'Close' : 'Add'}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: 'Task Tracker',
  showAdd: false,
};

Header.protoTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
