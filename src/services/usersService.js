import http from "./httpService";

const apiEndpoint =
  "https://my-json-server.typicode.com/pawelliszewski92/male-female-users-app";

export function getUsers() {
  return http.get(apiEndpoint + "/users");
}

export function deleteUser(id) {
  return http.delete(apiEndpoint + `/users/${id}`);
}

export function addUser(user) {
  return http.post(apiEndpoint + "/users", user);
}
