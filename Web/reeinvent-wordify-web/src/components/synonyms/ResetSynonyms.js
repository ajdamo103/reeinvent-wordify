import { useMutation } from "@tanstack/react-query";
import Modal from "components/layout/Modal";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as SynonymService from "services/SynonymService";
import { routes } from "utils/routes";

const ResetSynonyms = () => {
  const [show, setShow] = useState(true);
  const history = useNavigate();

  const mutation = useMutation({
    mutationFn: () => {
      return SynonymService.resetSynonyms();
    },
    onSuccess: () => {
      toast.success("Synonyms reset.");
    },
  });

  const handleClose = () => {
    setShow(false);
    history(routes.SEARCH_SYNONYMS.path);
  };

  const handleReset = () => {
    mutation.mutate();
    setShow(false);
    history(routes.SEARCH_SYNONYMS.path);
  };

  const Body = () => {
    return (
      <>
        <p>Dear user, </p>
        <p>
          we are happy to inform you that you have been selected as one of the
          lucky people to access the beta version of our app. As a beta user,
          you will have the opportunity to test new features. You also have
          special privileges such as the ability to reset data.
        </p>
        <p>Thanks for being part of our beta testing community.</p>
        <p>Good luck, Development Team.</p>
      </>
    );
  };
  return (
    <>
      <Modal
        show={show}
        title="Reset Synonyms?"
        leftText="Cancel"
        rightText="Reset"
        handleLeftClick={handleClose}
        handleRightClick={handleReset}
        rightButtonProperties={{
          className: "btn-danger",
        }}
        handleClose={handleClose}
        modalBody={Body}
      />
    </>
  );
};

export default ResetSynonyms;
