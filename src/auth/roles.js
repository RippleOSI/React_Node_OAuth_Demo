export const Administrator = {
  isAuthorised: (profile) => {
    console.log(profile);
    return profile.administrator;
  }
}

export const HealthcareWorker = {
  isAuthorised: (profile) => {
    return profile.administrator || profile.healthcareWorker;
  }
}

export const Patient = {
  isAuthorised: (profile) => {
    return profile.administrator || profile.healthcareWorker || profile.patient;
  }
}

export const LogginIn = {
  isAuthorised: (profile) => {
    return Boolean(profile);
  }
}