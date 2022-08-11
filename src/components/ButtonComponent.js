import { Button } from 'react-bootstrap';

const ButtonComponent = ({ children, onClick, type, color, size, className, disabled }) => {
  return (
    <Button id={color ? color : 'button'} onClick={onClick} type={type} size={size} className={className} disabled={disabled}>
      {children}
    </Button>
  );
};

export default ButtonComponent;
