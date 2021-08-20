import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({ showButtons, onAddClick, onLogoutClick, isOpen }) => {
  return (
    <header
      style={{
        minHeight: '100px',
        padding: '20px 20px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'blue',
      }}
      className='header'
    >
      <h1>Task Tracker</h1>
      <div className='btn-container'>
        {showButtons && (
          <Button
            color={isOpen ? 'red' : 'green'}
            text={isOpen ? 'Close' : 'Add'}
            onClick={onAddClick}
          />
        )}
        {showButtons && (
          <Button color='#00ccff' text='logout' onClick={onLogoutClick} />
        )}
      </div>
    </header>
  );
};

// Header.defaultProps = {
//   title: 'Task Tracker',
//   showAdd: false,
// };

// Header.protoTypes = {
//   title: PropTypes.string.isRequired,
// };

export default Header;
