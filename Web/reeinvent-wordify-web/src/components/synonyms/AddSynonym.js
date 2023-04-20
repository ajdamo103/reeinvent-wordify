import { useMutation } from "@tanstack/react-query";
import Button from "components/layout/Button";
import { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";
import * as SynonymService from "services/SynonymService";
import { regularExpressions } from "utils/constants";

const AddSynonym = () => {
  const [newSynonym, setNewSynonym] = useState({
    word: "",
    synonym: "",
  });

  const wordInput = useRef(null);

  const addSynonymMutation = useMutation({
    mutationFn: (newSynonym) => {
      return SynonymService.addSynonym(newSynonym);
    },
    onSuccess: () => {
      toast.success("Synonym added.");
      resetForm();
    },
  });

  const resetForm = () => {
    setNewSynonym({
      word: "",
      synonym: "",
    });
    setValidated(false);
    wordInput.current.focus();
  };

  const [formValidated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      addSynonymMutation.mutate(newSynonym);
      event.preventDefault();
    }
    setValidated(true);
  };

  const { isLoading } = addSynonymMutation;
  return (
    <>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <Form noValidate validated={formValidated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter a Word:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              required
              ref={wordInput}
              pattern={regularExpressions.requiredWithoutWhiteSpaces}
              value={newSynonym.word}
              onChange={(event) =>
                setNewSynonym({ ...newSynonym, word: event.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Please provide a Word.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter a Synonym:</Form.Label>
            <Form.Control
              type="text"
              required
              pattern={regularExpressions.requiredWithoutWhiteSpaces}
              value={newSynonym.synonym}
              onChange={(event) =>
                setNewSynonym({ ...newSynonym, synonym: event.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Please provide a Synonym.
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            loading={isLoading}
            title="Add Synonym"
          />
        </Form>
      </div>
    </>
  );
};

export default AddSynonym;
