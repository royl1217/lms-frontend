export function checkPasswordStrength(password) {
  let strength = 0;
  const feedback = [];

  // Criteria checks
  const hasMinLength = password.length >= 6;
  // const hasLowercase = /[a-z]/.test(password);
  // const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  //const hasSpecialChar = /[^0-9a-zA-Z]/.test(password); // Non-alphanumeric

  // Award points for meeting criteria
  if (hasMinLength) {
    strength += 1;
  } else {
    feedback.push("Password should be at least 6 characters long.");
  }
  // if (hasLowercase) {
  //   strength += 1;
  // } else {
  //   feedback.push("Password should contain at least one lowercase letter.");
  // }
  // if (hasUppercase) {
  //   strength += 1;
  // } else {
  //   feedback.push("Password should contain at least one uppercase letter.");
  // }
  if (hasNumber) {
    strength += 1;
  } else {
    feedback.push("Password should contain at least one number.");
  }
  // if (hasSpecialChar) {
  //   strength += 1;
  // } else {
  //   feedback.push("Password should contain at least one special character.");
  // }

  // Determine strength level based on points
  let strengthLevel;
  // if (strength === 5) {
  //   strengthLevel = "Strong";
  // } else if (strength >= 3) {
  //   strengthLevel = "Moderate";
  // } else {
  //   strengthLevel = "Weak";
  // }
  if (strength === 2) {
    strengthLevel = "Strong";
  } else {
    strengthLevel = "Weak";
  }

  return strengthLevel;
}
