const ErrorHandler = (error) => {
    if (error && error.response && error.response.status === 401) {
      window.sessionStorage.removeItem('accessToken');
      window.location.replace('/auths/sign-in');
    }
  };
  
  export default ErrorHandler;