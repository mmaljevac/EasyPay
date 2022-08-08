import { Button } from 'react-bootstrap';

const ButtonComponent = ({ children, onClick, type, color, size, className }) => {
  return (
    <Button id={color ? color : 'button'} onClick={onClick} type={type} size={size} className={className}>
      {children}
    </Button>
  );
};

export default ButtonComponent;
