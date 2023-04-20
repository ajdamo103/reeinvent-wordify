import useWordifyQuery from "components/hooks/useWordifyQuery";
import Button from "components/layout/Button";
import Loading from "components/layout/Loading";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import * as SynonymService from "services/SynonymService";
import { regularExpressions } from "utils/constants";

const SearchSynonyms = () => {
  const [synonymSearchValue, setSynonymSearchValue] = useState("");
  const [formValidated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      refetch();
      event.preventDefault();
    }
    setValidated(true);
  };

  const getSynonyms = () => {
    return SynonymService.getSynonyms(synonymSearchValue).then(
      (res) => res.data
    );
  };

  const { isLoading, data, refetch } = useWordifyQuery({
    tag: "searchSynonyms",
    parameters: [synonymSearchValue],
    queryFn: getSynonyms,
    enabled: false,
    retry: 1,
  });

  const showLoadingMessage = isLoading;

  const NoSynonymsMessage = () => (
    <div>No synonyms found for: {synonymSearchValue}</div>
  );

  const SynonymsList = ({ data }) => {
    return (
      <Container>
        <br />
        <SynonymsMessage
          handleSubmit={handleSubmit}
          setSynonymSearchValue={setSynonymSearchValue}
        />
        <br />
        <Row className="justify-content-center">
          <div className="col-4">
            {data?.map((value, index) => (
              <ListGroup key={`synonyms-group-${index}`}>
                <ListGroup.Item key={`synonyms-group-item-${index}`}>
                  {value}
                </ListGroup.Item>
              </ListGroup>
            ))}
          </div>
        </Row>
      </Container>
    );
  };

  const SynonymsMessage = () => (
    <div>Here are the synonyms for the word: {synonymSearchValue}</div>
  );

  return (
    <>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <Form noValidate validated={formValidated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter a Word:</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              required
              pattern={regularExpressions.requiredWithoutWhiteSpaces}
              value={synonymSearchValue}
              onChange={(event) => setSynonymSearchValue(event.target.value)}
            />
            <Form.Text className="text-muted" id="search" name="search">
              Enter a word that you would like to get synonyms for.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a Word.
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            loading={showLoadingMessage}
            title="Search"
          >
            Get Synonyms
          </Button>
        </Form>
      </div>

      {showLoadingMessage ? (
        <Loading />
      ) : (
        <>
          {synonymSearchValue && data?.length === 0 && <NoSynonymsMessage />}
          {synonymSearchValue && data?.length > 0 && (
            <SynonymsList data={data} />
          )}
        </>
      )}
    </>
  );
};

export default SearchSynonyms;
