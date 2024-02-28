import { FC } from 'react';
import { GoogleLogin } from '@react-oauth/google';


interface CustomGoogleLoginProps { 
  onCloseHandler: () => void;
}

const CustomGoogleLogin: FC<CustomGoogleLoginProps> = (props: CustomGoogleLoginProps) => {
  // const login = useGoogleLogin({
  //   onSuccess: tokenResponse => {
  //     console.log(tokenResponse)
  //   },
  // });

  const responseGoogle = (response: any) => {
    console.log(response);
    localStorage.setItem('accessToken', response.credential);
    const userDetailsStrSplit = (response.credential.split("."));
    const userDetailsStringDecode = decodeURIComponent(atob(userDetailsStrSplit[1]))
    localStorage.setItem('accessTokenDetails', userDetailsStringDecode);
    props.onCloseHandler();
  }

  return <>
    {/* <Button onClick={() => login()} bg="#0069ff" color="white">
      Sign in with Google
    </Button> */}
    <GoogleLogin
        size="large"
        shape="rectangular"
        type="standard"
        width="400"
        onSuccess={responseGoogle}
        onError={() => {
          console.log('Login Failed');
        }}
      />
  </>
}

export default CustomGoogleLogin;
