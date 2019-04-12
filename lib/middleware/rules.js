function UserRoleRule(role) {
  return {
    authorize: (user) => {
      console.log("checking role", role, user[role]);
      return user[role] === "true";
    }
  }
}

 function UserRoleWithIdRule(role, id) {
  return {
    authorize: (user) => {
      var isAuthorised = user[role] === "true" && user.id === id;
      console.log("Authorised", isAuthorised);
      return isAuthorised;
    }
  }
}

function AuthorizeAdministrator() {
  return [
    new UserRoleRule("administrator")
  ]
}

function AuthorizeHealthcare() {
  return [
    new UserRoleRule("administrator"),
    new UserRoleRule("healthcareWorker")
  ]
}

function AuthorizePatient(patientId) {
  return [
    new UserRoleRule("administrator"),
    new UserRoleRule("healthcareWorker"),
    new UserRoleWithIdRule("patient", patientId)
  ]
}

module.exports = {
  AuthorizeAdministrator, AuthorizeHealthcare, AuthorizePatient
}