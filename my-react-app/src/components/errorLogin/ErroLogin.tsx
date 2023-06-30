type ErrorLoginProps = {
  message: string;
};

function ErrorLogin({ message }: ErrorLoginProps) {
  return <div>{message}</div>;
}

export default ErrorLogin;
