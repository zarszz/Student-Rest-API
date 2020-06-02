import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";
import { CONFIG } from "../env.ts";

const key = CONFIG.secret;
const header: Jose = {
  alg: "HS512",
  typ: "JWT",
};

export const generateToken = (userData: Array<any>): string => {
    const payload: Payload = {
      iss: userData[0].email,
      student_id: userData[0].student_id,
      exp: setExpiration(new Date().getTime() + (1000 * 60 * 60)), // token for 60 minutes
    };
    return makeJwt({ header, payload, key });
}