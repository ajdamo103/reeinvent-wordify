import { Button as BootstrapButton } from "react-bootstrap";

const Button = ({ loading, title, ...rest }) => {
  return (
    <BootstrapButton disabled={loading} {...rest}>
      {loading ? "Loading..." : title}
    </BootstrapButton>
  );
};

export default Button;
