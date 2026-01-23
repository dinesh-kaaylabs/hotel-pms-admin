
export const LOGIN_MUTATION = `
  mutation AdminLogin($email: String!, $password: String!) {
    adminLogin(input: { email: $email, password: $password }) {
      status
      message
      mfaEnabled
      user {
        id
        name
        hotels { id name }
      }
    }
  }
`;

export const LOGOUT_MUTATION = `
  mutation Logout {
    logout {
      success
    }
  }
`;

export const ME_QUERY = `
  query Me {
    me {
      id
      email
      name
      role
      avatar
      hotelId
      hotels {
        id
        name
      }
    }
  }
`;

export const VERIFY_MFA_MUTATION = `
  mutation VerifyMFA($code: String!) {
    verifyMFA(code: $code) {
      success
      message
    }
  }
`;
