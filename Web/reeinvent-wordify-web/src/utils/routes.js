import { lazy } from "react";
import { generatePath } from "react-router-dom";

const SearchSynonymsLazy = lazy(() =>
  import("components/synonyms/SearchSynonyms")
);
const AddSynonymLazy = lazy(() => import("components/synonyms/AddSynonym"));
const ResetSynonymsLazy = lazy(() =>
  import("components/synonyms/ResetSynonyms")
);

export const routes = {
  SEARCH_SYNONYMS: {
    id: "SEARCH_SYNONYMS",
    path: "/",
    component: SearchSynonymsLazy,
    title: "Search Synonyms",
  },
  ADD_SYNONYM: {
    id: "ADD_SYNONYM",
    path: "/add",
    component: AddSynonymLazy,
    title: "Add Synonym",
  },
  RESET_SYNONYMS: {
    id: "RESET_SYNONYMS",
    path: "/reset",
    component: ResetSynonymsLazy,
    title: "Reset Synonyms",
  },
};

export function generateLink(route) {
  return generatePath(route.path);
}
