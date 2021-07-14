import { gql } from "@apollo/client";
import { state} from "../cache";
import { client } from "../pages/_app";


export function setState(field) {
  state({ ...state(), ...field });
}
