import { GoogleLogout } from 'react-google-login'

const CLIENT_ID = "442607078588-g2sitipbnhfagfbvd8vvmrq4op6qsf2m.apps.googleusercontent.com"

function GoogleLogOutButton() {

    const responseGoogle = (response) => {
        console.log(response);
      }

    return <div class='google-signin'> 
            <GoogleLogout
                clientId={CLIENT_ID}
                buttonText="Remove access to your Google account"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                isSignedIn={false}
                cookiePolicy={'single_host_origin'}
            />
           </div>
}

   
export default GoogleLogOutButton;
