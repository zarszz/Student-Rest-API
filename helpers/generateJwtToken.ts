import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";

const key = "your-secret";
const payload: Payload = {
  iss: "joe",
  exp: setExpiration(new Date().getTime() + (1000 * 60 * 60)), // token for 60 minutes
};
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export const generateToken = (): string => {
    return makeJwt({ header, payload, key });
}