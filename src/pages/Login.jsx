import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function Login() {
  return(
    <>
      <div className="login">
        <GoogleOAuthProvider clientId="766443344463-vo3cr1d1hvv4jnqf023549i5vtlpf2fe.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </>
  )
}