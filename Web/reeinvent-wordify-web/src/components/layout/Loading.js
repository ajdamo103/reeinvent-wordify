import styled from "styled-components";

const { Spinner } = require("react-bootstrap");

const StyledLoading = styled(Spinner)`
  margin: 20px 0px;
`;

const Loading = () => {
  return <StyledLoading animation="grow" />;
};

export default Loading;
